import { Module } from '@nestjs/common';
import { SignService } from './sign.service';
import { SignController } from './sign.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../util/secret.contants';
import { JwtStrategy } from '../jwt/jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '3d' },
      }),
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [SignController],
  providers: [SignService, JwtStrategy],
})
export class SignModule {}
