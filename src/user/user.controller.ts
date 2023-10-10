import {
    Controller,
    Get,
    Body,
    Patch,
    Delete,
    UseGuards,
    Request,
    UsePipes,
    ClassSerializerInterceptor,
    UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../common/passport/jwt-auth.guard';
import { JoiValidationPipe } from '../validator/joi-validation.pipe';
import { profileUpdateSchema } from './validator/profile.validation';
import { UserEntity } from './entities/user.entity';
import { Success, success } from '../utils/response.util';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('profile')
    getProfile(@Request() req): Success<UserEntity> {
        return success(new UserEntity(req.user));
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @UsePipes(new JoiValidationPipe(profileUpdateSchema))
    @Patch('profile')
    async update(@Request() req, @Body() updateUserDto: UpdateUserDto): Promise<Success<UserEntity>> {
        const result: UserEntity = await this.userService.update(req.user.id, updateUserDto);
        return success(new UserEntity(result));
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Delete('profile')
    async remove(@Request() req): Promise<Success<UserEntity>> {
        const result: UserEntity = await this.userService.remove(req.user.id);
        return success(new UserEntity(result));
    }
}
