import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import * as process from 'process';
import configuration from './config/configuration';
import { PrismaService } from './prisma.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`,
            load: [configuration],
        }),
        ThrottlerModule.forRoot([
            {
                ttl: 15 * 60 * 1000,
                limit: 500,
            },
        ]),
        configuration().logger,
        AuthModule,
        UserModule,
        JwtModule.registerAsync({
            imports: [ConfigModule, AuthModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('jwt.secret_key'),
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        Logger,
        PrismaService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule {}
