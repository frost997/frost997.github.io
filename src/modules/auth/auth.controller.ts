import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LoginDto, SignUpDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './JWT/JWT-AuthGuard';
// import { RolesAuthGuard } from './Roles/roles-AuthGuard';
// import { Roles } from './Roles/roles.decorator';
// import { roles } from '../../common/constant';
import { Response } from 'express';
import { RolesAuthGuard } from './Roles/roles-AuthGuard';
import { roles } from 'src/common/constant';
import { Roles } from './Roles/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signUp')
  async signUp(@Body() signUpDto: SignUpDto, @Res() res: Response) {
    const result = await this.authService.signUp(signUpDto);
    return this.authService.sendAuthCookies(res, result);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const result = await this.authService.login(loginDto);
    return this.authService.sendAuthCookies(res, result);
  }

  @UseGuards(JwtAuthGuard, RolesAuthGuard)
  @Get('profile')
  @Roles([roles.ADMIN])
  getProfile(@Request() request: any) {
    return {
      id: request.user.id,
      email: request.user.email,
      userName: request.user.userName,
      roles: request.user.roles
    };
  }

  @Post('refresh')
  async refresh(@Body('refresh_token') token: string, @Res() res: Response) {
    const result = await this.authService.refresh(token);
    return this.authService.sendAuthCookies(res, result);
  }

  @Post('logout')
  async logOut(@Res() res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return res.send({ success: true, message: 'Logged out' });
  }
}
