import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException, Inject } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ModuleRef } from "@nestjs/core";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService,) {
        super({
            usernameField: 'name',  // Указываем, что используем поле 'name' вместо 'username'
            passwordField: 'password'});
    }

    async validate(name: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(name, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}