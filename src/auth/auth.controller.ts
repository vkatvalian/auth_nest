import { Controller, Request, Post, UseGuards,Body, NotAcceptableException, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { RegistrationStatus } from './interfaces/registrations';
import * as bcrypt from 'bcrypt'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, 
      private readonly usersService: UsersService) {}
    
    @Post('register')
    public async register(
        @Body() createUserDto: CreateUserDto,): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.registerUser(
      createUserDto,
    );

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @Post('login')
  public async login(
    @Body() createUserDto: CreateUserDto) {
      const {email, password} = createUserDto;
      const user = await this.usersService.findOne({ where: {email} });
      if (!user) return null;
      const passwordValid = await bcrypt.compare(password, user.password)
      if (!passwordValid){
        console.log("user credentials error")
      }
      if (user && passwordValid) {
          return user;
      }
      return null;
    }
}
