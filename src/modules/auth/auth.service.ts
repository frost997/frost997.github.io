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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: MongoRepository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUp: SignUpDto) {
    const { password, userName, email } = signUp;
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('User with this email has already exist');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      userName: userName,
    });

    await this.userRepository.save(user);

    const payload = { email: user.email, sub: user._id };
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
      user: {
        id: user._id,
        email: user.email,
        userName: user.userName,
      },
    };
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

    // Generate JWT token
    const payload = { email: user.email, sub: user._id, roles: user.roles };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        id: user._id,
        email: user.email,
        userName: user.userName,
      },
    };
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
}
