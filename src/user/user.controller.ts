import { Controller, Get, Body, Patch, Delete, UseGuards, Request, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../common/passport/jwt-auth.guard';
import { JoiValidationPipe } from '../validator/joi-validation.pipe';
import { profileUpdateSchema } from './validator/profile.validation';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @UsePipes(new JoiValidationPipe(profileUpdateSchema))
    @Patch('profile')
    update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
        const { firstName, lastName } = updateUserDto;
        // Check and update lastName
        updateUserDto.lastName =
            lastName !== undefined && lastName !== null && lastName.trim() === '' ? req.user.lastName : lastName;

        // Check and update firstName
        updateUserDto.firstName =
            firstName !== undefined && firstName !== null && firstName.trim() === '' ? req.user.firstName : firstName;

        return this.userService.update(req.user.id, updateUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('profile')
    remove(@Request() req) {
        return this.userService.remove(req.user.id);
    }
}
