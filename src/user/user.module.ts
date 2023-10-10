import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../common/passport/jwt.strategy';
import { AuthModule } from '../auth/auth.module';
import { PrismaService } from '../prisma.service';

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, JwtStrategy, PrismaService],
})
export class UserModule {}
