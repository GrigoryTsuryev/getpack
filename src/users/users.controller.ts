import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // @Post()
  // // @UseGuards(JwtAuthGuard)
  // async createUser(@Body() userDto: CreateUserDTO): Promise<User> {
  //     return this.userService.createUser(userDto)
  //   }

  // @Get(':id')
  // findOne(@Param('id') username: string) {
  //     return this.userService.findOne(username);
  // }
}
