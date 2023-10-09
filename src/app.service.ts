import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class AppService {
    constructor(private prisma: PrismaService) {}

    getHello(): string {
        return 'Hello World!';
    }
}
