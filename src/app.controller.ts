import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly logger: Logger,
        private configService: ConfigService,
    ) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
