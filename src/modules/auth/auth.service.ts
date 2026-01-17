import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, SignUpDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: MongoRepository<UserEntity>,
    private jwtService: JwtService,
  ) { }

  async signUp(signUp: SignUpDto) {
    const { password, userName, email } = signUp;
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('User with this email has already exist');
    }

    // ⬇️ Check if this is the first user in the system
    const usersCount = await this.userRepository.count();
    const hashedPassword = await bcrypt.hash(password, 12);

    const roles = usersCount === 0 ? ['ADMIN'] : ['USER']; // ⭐ FIRST USER IS ADMIN

    const user = this.userRepository.create({
      email,
      roles,
      password: hashedPassword,
      userName: userName,
    });

    await this.userRepository.save(user);

    return this.issueTokens(user);
  }

  sendAuthCookies(res: Response, data: any) {
    res.cookie('access_token', data.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000, // 1h
    });

    res.cookie('refresh_token', data.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    });

    return res.send({
      user: {
        id: data.user._id,
        email: data.user.email,
        userName: data.user.userName,
        roles: data.user.roles,
      },
    });
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.issueTokens(user);
  }

  async validateUser(payload: any) {
    const objectId = new ObjectId(payload.sub);
    const user: UserEntity = await this.userRepository.findOne({
      where: { _id: objectId },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      id: user._id.toString(),
      email: user.email,
      userName: user.userName,
      roles: user.roles,
    };
  }

  async issueTokens(user: UserEntity) {
    const payload = { sub: user._id, email: user.email };

    const access = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
    });

    const refresh = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    const hashedRefresh = await bcrypt.hash(refresh, 10);

    await this.userRepository.update(user._id, {
      refresh_token: hashedRefresh,
    });

    return {
      access_token: access,
      refresh_token: refresh,
      user: {
        id: user._id,
        email: user.email,
        userName: user.userName,
        roles: user.roles,
      },
    };
  }

  async refresh(refreshToken: string) {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });

    const userId = new ObjectId(payload.sub);
    const user = await this.userRepository.findOne({
      where: { _id: userId },
    });

    if (!user || !user.refresh_token) {
      throw new UnauthorizedException('Access denied');
    }

    const valid = await bcrypt.compare(refreshToken, user.refresh_token);
    if (!valid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.issueTokens(user);
  }
}
