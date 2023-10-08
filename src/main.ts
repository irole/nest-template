import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

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
        this.app.useLogger(this.app.get(WINSTON_MODULE_NEST_PROVIDER));

        await this.app.listen(port, () => {
            Logger.log(`Server running on port ${port}`);
        });
    }
}

const appInstance = new App();
appInstance.start().then();
