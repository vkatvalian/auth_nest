import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { RegistrationStatus } from './interfaces/registrations';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async registerUser(userDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'user registered',
    };
    
    try {
      await this.usersService.create(userDto);  
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }

    return status;
  }

  async validateUser(email, password: string): Promise<any> {
    const user = await this.usersService.findOne({ where: {email} });
    if (!user) return null;
    const passwordValid = await bcrypt.compare(password, user.password)
    if (!user) {
        // throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
        return user;
    }
    return null;
  }
}

