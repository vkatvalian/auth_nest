import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(userDto: CreateUserDto) {
    try {
      const { email, password } = userDto;
  
      const userInDb = await this.userRepo.findOne({ where: { email } });
      if (userInDb) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
  
      const user: User = await this.userRepo.create({
        email,
        password,
      });
  
      await this.userRepo.save(user);
    } catch (e) {
      console.log(e)
    }      
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(options?: any) {
    const user = await this.userRepo.findOne(options);
    console.log("user", user)
    return user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
