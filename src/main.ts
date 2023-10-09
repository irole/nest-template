import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as compression from 'compression';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

class App {
    private app;
    private configService: ConfigService;

    constructor() {}

    async start() {
        this.app = await NestFactory.create(AppModule);
        await this.setup();
    }

    private async setup() {
        this.configService = this.app.get(ConfigService);
        const port: number = this.configService.get<number>('PORT');
        this.app.useGlobalPipes(new ValidationPipe());
        this.app.useLogger(this.app.get(WINSTON_MODULE_NEST_PROVIDER));
        this.app.use(compression());
        this.app.use(
            helmet({
                contentSecurityPolicy: false,
            }),
        );
        this.app.enableCors(this.configService.get('cors'));
        const config = new DocumentBuilder()
            .setTitle('iRole Nest Template')
            .setDescription('The cats API description')
            .setVersion('1.0')
            .addTag('auth')
            .addBearerAuth()
            .build();
        const document = SwaggerModule.createDocument(this.app, config);
        SwaggerModule.setup('api', this.app, document);
        await this.app.listen(port, () => {
            Logger.log(`Server running on port ${port}`);
        });
    }
}

const appInstance = new App();
appInstance.start().then();
