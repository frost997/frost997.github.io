import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LoginDto, SignUpDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './JWT/JWT-AuthGuard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signUp')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() request: any) {
    return {
      id: request.user._id,
      email: request.user.email,
      userName: request.user.userName,
    };
  }
}
