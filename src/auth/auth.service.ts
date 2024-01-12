import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/auth/schema/user.schema';
import { RegisterAuthDTO } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { LoginAuthDTO } from './dto/login-auth.dto';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { AES, enc } from 'crypto-js';
import { TokenService } from './shared-auth/token.service';
import { TokenAuthDTO } from './dto/token-auth.dto';
import { jwtConstants } from './jwt/jwt.constants';
@Injectable()
export class AuthService {
    private token: string = '';


    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
        private readonly jwtService:JwtService,
        private readonly tokenService: TokenService

    ){}

    async register(userObject: RegisterAuthDTO){
        const {password } = userObject;
        const plainToHash = await hash(password, 10);
        userObject = {...userObject, password:plainToHash};
        return this.userModel.create(userObject);
    }

    async login(userObjectLogin:LoginAuthDTO){
        const { email, password } = userObjectLogin;
        const findUser = await this.userModel.findOne({email})

        if (!findUser) throw new HttpException('USER NOT FOUND', 404);

        const decryptedPassword = AES.decrypt(password, jwtConstants.secretKey).toString(enc.Utf8);

        const checkPassword = await compare(decryptedPassword, findUser.password)

        if (!checkPassword) throw new HttpException('PASSWORD INVALID', 403);

        const payload = {id:findUser._id, name:findUser.name};

        let exist:TokenAuthDTO = await this.tokenService.fetchToken(email);

        if (!exist){
            this.token = this.jwtService.sign(payload);

            let tokenDto:TokenAuthDTO = {
                email: email,
                token: this.token,
                createdAt: new Date(),
            }
            this.tokenService.insertToken(tokenDto);
            console.log("new token inserted")

        
        } else {
            await this.jwtService.verifyAsync(exist.token).then(()=>{
                this.token = exist.token;
                console.log("returned existing token")

            }).catch(error =>{
                if (error instanceof TokenExpiredError) {
                    console.log("updating token")
                    this.token = this.jwtService.sign(payload);

                    this.tokenService.updateToken(email, this.token);
                }
            });
        }

        const data = { 
            token: this.token,
            expiresIn: await this.tokenService.getExpirationTime(this.token)
        }

        return data;
    }
}
