import {
  Controller,
  Body,
  Get,
  Param,
  Patch,
  Request,
  UseGuards,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { updateUser } from './user.dto';
import { JwtAuthGuard } from '../auth/JWT/JWT-AuthGuard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(JwtAuthGuard)
  @Put(':userID')
  async updateUser(
    // @Request() request: any,
    @Body() updateUser: updateUser,
    @Param('userID') userID: string,
  ) {
    // if (userID !== request._id) {
    //   throw new UnauthorizedException('Miss match userID');
    // }
    const { userName, productUser } = updateUser;
    return await this.userService.updateUser({ userName, productUser, userID });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userID')
  getUser(@Request() request: any, @Param('userID') userID: string) {
    if (userID !== request._id) {
      throw new Error('Miss match userID');
    }
    return {
      id: request.user._id,
      email: request.user.email,
      userName: request.user.userName,
    };
  }
}
