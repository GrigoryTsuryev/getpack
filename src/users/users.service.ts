import { Injectable } from '@nestjs/common';
import { User } from 'src/interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user-dto';

@Injectable()
export class UsersService {
  createUser(userDto: CreateUserDTO): User | PromiseLike<User> {
    throw new Error('Method not implemented.');
  }
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        username: 'Sender',
        password: 'Sender',
        type: 'Sender',
      },
      {
        username: 'Sender1',
        password: 'Sender1',
        type: 'Sender1',
      },
      {
        username: 'Courier',
        password: 'Courier',
        type: 'Courier',
      },
      {
        username: 'Courier1',
        password: 'Courier1',
        type: 'Courier1',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
