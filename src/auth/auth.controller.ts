import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { registerSchema } from './validator/register.validation';
import { JoiValidationPipe } from '../validator/joi-validation.pipe';
import { loginSchema } from './validator/login.validation';
import { ForgotPasswordDto } from './dto/ForgotPassword.dto';
import { forgotPasswordSchema } from './validator/forgotPassword.validation';
import { resetPasswordSchema } from './validator/resetPassword.validation';
import { ResetPasswordDto } from './dto/ResetPassword.dto';

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

    @Post('forgotPassword')
    @UsePipes(new JoiValidationPipe(forgotPasswordSchema))
    forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
        return this.authService.forgotPassword(forgotPasswordDto);
    }

    @Post('resetPassword')
    @UsePipes(new JoiValidationPipe(resetPasswordSchema))
    resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        return this.authService.resetPassword(resetPasswordDto);
    }
}
