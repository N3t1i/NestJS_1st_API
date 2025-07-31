import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { SetMetadata } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

//export const IS_PUBLICK_KEY = 'isPublic';
//export const Public = () => SetMetadata(IS_PUBLICK_KEY, true);

@Module({
  controllers: [AuthController],
  providers: [AuthService,
    /*{
      provide: APP_GUARD,
      useClass: AuthGuard,
    },*/
    LocalStrategy,
    JwtStrategy
  ],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s'},
    }),
    PassportModule,
  ],
  exports: [AuthService],
})
export class AuthModule {}
