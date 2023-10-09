import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import * as process from 'process';
import configuration from './config/configuration';
import { PrismaService } from './prisma.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV}`,
            load: [configuration],
        }),
        configuration().logger,
        AuthModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService, Logger, PrismaService],
})
export class AppModule {}
