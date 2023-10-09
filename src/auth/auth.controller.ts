import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { registerSchema } from './validator/register.validation';
import { JoiValidationPipe } from '../validator/joi-validation.pipe';
import { loginSchema } from './validator/login.validation';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @UsePipes(new JoiValidationPipe(registerSchema))
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    @UsePipes(new JoiValidationPipe(loginSchema))
    login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
}
