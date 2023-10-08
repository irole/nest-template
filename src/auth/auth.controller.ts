import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    create(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }
    //
    // @Get()
    // findAll() {
    //     // return this.authService.findAll();
    // }
    //
    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     //return this.authService.findOne(+id);
    // }
    //
    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    //     //return this.authService.update(+id, updateAuthDto);
    // }
    //
    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     //return this.authService.remove(+id);
    // }
}
