import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) {}

    async register(registerDto: RegisterDto) {
        const payload = { email: registerDto.email };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    //async validateUser(username: string, pass: string): Promise<any> {
    // const user = await this.usersService.findOne(username);
    // if (user && user.password === pass) {
    //     const { password, ...result } = user;
    //     return result;
    // }
    // return null;
    //}

    // async login(user: any) {
    //     const payload = { username: user.username, sub: user.userId };
    //     return {
    //         access_token: this.jwtService.sign(payload),
    //     };
    // }

    // generateToken(userId: Types.ObjectId, type: string = 'TOKEN'): string {
    //     let expiresIn: string;
    //     if (type === 'TOKEN') {
    //         expiresIn = '1h';
    //         return jwt.sign({ id: userId }, Config.jwt.secret_key, { expiresIn });
    //     } else {
    //         expiresIn = '10d';
    //         return jwt.sign({ id: userId }, Config.jwt.refresh_key, { expiresIn });
    //     }
    // }
}
