import {
  Controller,
  Body,
  Get,
  Param,
  Request,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { updateUser } from './user.dto';
import { Roles } from '../auth/Roles/roles.decorator';
import { RolesAuthGuard } from '../auth/Roles/roles-AuthGuard';
import { roles } from 'src/common/constant';
import { Public } from '../auth/Roles/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Roles([roles.ADMIN])
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

  @Public()
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
