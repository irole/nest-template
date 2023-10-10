import {
    Controller,
    Post,
    Body,
    UsePipes,
    HttpCode,
    UseInterceptors,
    ClassSerializerInterceptor,
} from '@nestjs/common';
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
import { Success, success } from '../utils/response.util';
import { LoginEntity } from './entities/login.entity';
import { RegisterEntity } from './entities/register.entity';
import { ResetPasswordEntity } from './entities/resetPassword.entity';
import { ForgotPasswordEntity } from './entities/forgotPassword.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @UsePipes(new JoiValidationPipe(registerSchema))
    @HttpCode(201)
    async register(@Body() registerDto: RegisterDto): Promise<Success<RegisterEntity>> {
        const result: RegisterEntity = await this.authService.register(registerDto);
        return success(new RegisterEntity(result), 201);
    }

    @Post('login')
    @UsePipes(new JoiValidationPipe(loginSchema))
    @HttpCode(200)
    async login(@Body() loginDto: LoginDto): Promise<Success<LoginEntity>> {
        const result: LoginEntity = await this.authService.login(loginDto);
        return success(new LoginEntity(result));
    }

    @Post('forgotPassword')
    @UsePipes(new JoiValidationPipe(forgotPasswordSchema))
    @HttpCode(200)
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<Success<ForgotPasswordEntity>> {
        const result: ForgotPasswordEntity = await this.authService.forgotPassword(forgotPasswordDto);
        return success(new ForgotPasswordEntity(result));
    }

    @Post('resetPassword')
    @UsePipes(new JoiValidationPipe(resetPasswordSchema))
    @HttpCode(200)
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<Success<ResetPasswordEntity>> {
        const result: ResetPasswordEntity = await this.authService.resetPassword(resetPasswordDto);
        return success(new ResetPasswordEntity(result));
    }
}
