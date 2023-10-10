import { ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '../prisma.service';
import { Prisma, ResetPassword, User } from '@prisma/client';
import { bcryptPassword, comparePassword } from '../utils/password';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { use } from 'passport';
import { ForgotPasswordDto } from './dto/ForgotPassword.dto';
import { ResetPasswordDto } from './dto/ResetPassword.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService,
        private configService: ConfigService,
    ) {}

    async register(registerDto: RegisterDto) {
        const { email, password } = registerDto;
        const userExist: User | null = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (userExist) {
            throw new HttpException('This user registered before!', HttpStatus.CONFLICT);
        }

        const user: User = await this.prisma.user.create({
            data: {
                email,
                password: bcryptPassword(password),
            },
        });
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.generateToken(payload),
        };
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;
        const user: User | null = await this.prisma.user.findUnique({
            where: {
                email,
                isDelete: false,
            },
        });
        if (!user) throw new UnauthorizedException('username or password is wrong!');
        const checkPassword: boolean = comparePassword(password, user.password);
        if (!checkPassword) throw new UnauthorizedException('username or password is wrong!');
        if (!user.isActive) throw new ForbiddenException('your account is not active!');
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.generateToken(payload),
            refresh_token: this.generateToken(payload, 'REFRESH_TOKEN'),
        };
    }

    async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<string> {
        const { email } = forgotPasswordDto;
        const user: User = await this.prisma.user.findUnique({
            where: {
                email,
                isDelete: false,
                isActive: true,
            },
        });
        if (user) {
            const resetPasswordObject = {
                email,
                token: this.generateToken({ email }, 'EMAIL'),
            };
            const { token } = await this.prisma.resetPassword.create({
                data: {
                    ...resetPasswordObject,
                },
                select: { token: true },
            });
            // send Email
            console.log('=>(auth.service.ts:82) token', token);
        }
        return 'Email Send Successfully';
    }

    async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<string> {
        const { password, token } = resetPasswordDto;
        const checkJWT = this.jwtService.verify(token, { secret: this.configService.get('jwt.email_key') });
        const resetPassword: ResetPassword = await this.prisma.resetPassword.findUnique({
            where: {
                token,
                email: checkJWT.email,
            },
        });
        if (!resetPassword || resetPassword.use || checkJWT.email !== resetPassword.email) {
            throw new ForbiddenException('This Token Expired');
        }
        await this.prisma.user.update({
            where: {
                email: resetPassword.email,
                isDelete: false,
                isActive: true,
            },
            data: {
                password: bcryptPassword(password),
            },
        });
        await this.prisma.resetPassword.update({ where: { token, email: checkJWT.email }, data: { use: true } });
        return 'Your password Changed Successfully';
    }

    generateToken(payload: object, type: string = 'TOKEN'): string {
        if (type === 'TOKEN') {
            return this.jwtService.sign(payload, { secret: this.configService.get('jwt.secret_key'), expiresIn: '1h' });
        }
        if (type === 'EMAIL') {
            return this.jwtService.sign(payload, { secret: this.configService.get('jwt.email_key'), expiresIn: '2h' });
        } else {
            return this.jwtService.sign(payload, {
                secret: this.configService.get('jwt.secret_key'),
                expiresIn: '10h',
            });
        }
    }
}
