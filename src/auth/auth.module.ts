import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../prisma.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [PassportModule],
    controllers: [AuthController],
    providers: [AuthService, PrismaService, ConfigService, JwtService],
})
export class AuthModule {}
