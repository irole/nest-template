import { Controller, Post, Body, UsePipes, HttpCode } from '@nestjs/common';
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
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiOkResponseSuccess } from '../utils/ApiOkResponseSuccess.util';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @UsePipes(new JoiValidationPipe(registerSchema))
    @HttpCode(201)
    @ApiBody({ type: RegisterDto })
    @ApiResponse({ status: 400, description: 'Bad Request!' })
    @ApiResponse({ status: 409, description: 'This user registered before!' })
    @ApiOkResponseSuccess(RegisterEntity, 201)
    async register(@Body() registerDto: RegisterDto): Promise<Success<RegisterEntity>> {
        const result: RegisterEntity = await this.authService.register(registerDto);
        return success(result, 201);
    }

    @Post('login')
    @UsePipes(new JoiValidationPipe(loginSchema))
    @HttpCode(200)
    @ApiBody({ type: LoginDto })
    @ApiResponse({ status: 400, description: 'Bad Request!' })
    @ApiResponse({ status: 401, description: 'username or password is wrong!' })
    @ApiResponse({ status: 403, description: 'your account is not active!' })
    @ApiOkResponseSuccess(LoginEntity, 200)
    async login(@Body() loginDto: LoginDto): Promise<Success<LoginEntity>> {
        const result: LoginEntity = await this.authService.login(loginDto);
        return success(result);
    }

    @Post('forgotPassword')
    @UsePipes(new JoiValidationPipe(forgotPasswordSchema))
    @HttpCode(200)
    @ApiResponse({ status: 400, description: 'Bad Request!' })
    @ApiResponse({ status: 401, description: 'username or password is wrong!' })
    @ApiResponse({ status: 403, description: 'your account is not active!' })
    @ApiOkResponseSuccess(ForgotPasswordEntity, 200)
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<Success<ForgotPasswordEntity>> {
        const result: ForgotPasswordEntity = await this.authService.forgotPassword(forgotPasswordDto);
        return success(result);
    }

    @Post('resetPassword')
    @UsePipes(new JoiValidationPipe(resetPasswordSchema))
    @HttpCode(200)
    @ApiResponse({ status: 400, description: 'Bad Request!' })
    @ApiResponse({ status: 403, description: 'This Token Expired' })
    @ApiOkResponseSuccess(ResetPasswordEntity, 200)
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<Success<ResetPasswordEntity>> {
        const result: ResetPasswordEntity = await this.authService.resetPassword(resetPasswordDto);
        return success(result);
    }
}
