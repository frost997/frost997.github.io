import {
  Controller,
  Body,
  Get,
  Param,
  Request,
  UseGuards,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { updateUser } from './user.dto';
import { JwtAuthGuard } from '../auth/JWT/JWT-AuthGuard';
import { RolesAuthGuard } from '../auth/role/roles-AuthGuard';
import { Roles } from '../auth/Roles/role.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, RolesAuthGuard)
  @Put(':userID')
  async updateUser(
    @Request() request: any,
    @Body() updateUser: updateUser,
    @Param('userID') userID: string,
  ) {
    if (userID !== request.user.id.toString()) {
      throw new UnauthorizedException('Miss match userID');
    }
    this.userService.init();
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
