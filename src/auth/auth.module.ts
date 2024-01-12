import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from 'src/auth/schema/user.schema';
import { JwtModule} from '@nestjs/jwt';
import { jwtConstants } from './jwt/jwt.constants';
import { SharedAuthModule } from './shared-auth/shared-auth.module';
@Module({
    imports: [
        MongooseModule.forFeature([
            {
              name:User.name,
              schema:UserSchema
            },
          ]),
          JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: jwtConstants.expiration}
          }),
          SharedAuthModule
        ],

    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
