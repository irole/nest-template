import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async update(id: string, updateUserDto: UpdateUserDto) {
        const { lastName, firstName } = updateUserDto;

        return this.prisma.user.update({
            where: {
                id,
            },
            data: {
                firstName,
                lastName,
            },
        });
    }

    async remove(id: string) {
        return this.prisma.user.update({
            where: {
                id,
            },
            data: {
                isDelete: true,
            },
        });
    }

    async validateUserById(id: string): Promise<any> {
        return this.prisma.user.findUnique({ where: { id, isDelete: false, isActive: true } });
    }
}
