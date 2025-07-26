import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(
        username: string, 
        pass: string
    ): Promise<{ access_token: string }> {
        const user = await this.usersService.find_by_name(username);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.userId, username: user.username };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.find_by_name(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.usermane, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
