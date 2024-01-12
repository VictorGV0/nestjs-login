import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from '../schema/token.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../jwt/jwt.constants';
import { JwtStrategy } from '../jwt/jwt.strategy';

@Module({
    imports:[
    MongooseModule.forFeature([
        {
          name:Token.name,
          schema:TokenSchema
        },
      ]),
      JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: {expiresIn: jwtConstants.expiration}
      }),],
    providers:[TokenService, JwtStrategy],
    exports:[TokenService]
})
export class SharedAuthModule {}
