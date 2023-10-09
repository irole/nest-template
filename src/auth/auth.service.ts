import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from '../prisma.service';
import { Prisma, User } from '@prisma/client';
import { bcryptPassword, comparePassword } from '../utils/password';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';

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
            },
        });
        if (!user) throw new UnauthorizedException('username or password is wrong!');
        const checkPassword: boolean = comparePassword(password, user.password);
        if (!checkPassword) throw new UnauthorizedException('username or password is wrong!');
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.generateToken(payload),
            refresh_token: this.generateToken(payload, 'REFRESH_TOKEN'),
        };
    }

    async validateUserById(id: string): Promise<any> {
        const user: User = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    generateToken(payload: object, type: string = 'TOKEN'): string {
        if (type === 'TOKEN') {
            return this.jwtService.sign(payload, { secret: this.configService.get('jwt.secret_key') });
        } else {
            return this.jwtService.sign(payload, { secret: this.configService.get('jwt.refresh_key') });
        }
    }
}
