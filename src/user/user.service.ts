import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

import { PrismaService } from '../prisma.service';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
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

    async remove(id: string): Promise<UserEntity> {
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
