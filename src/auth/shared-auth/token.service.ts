import { Injectable } from '@nestjs/common';
import { TokenAuthDTO } from '../dto/token-auth.dto';
import { Token, TokenDocument } from '../schema/token.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

export interface TokenResponse {
  status: number
  success: boolean
  token: string
  expiresIn: any
}

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>,
    private readonly jwtService:JwtService,

  ) {}

  async insertToken(tokenDto: TokenAuthDTO) {
    this.tokenModel.create(tokenDto);
  }
  async fetchToken(email: string): Promise<TokenAuthDTO> {
    return new Promise(async (resolve) => {
      const res = await this.tokenModel.findOne({ email }).exec();
      if (!res) resolve(null);

      resolve(res)
    });
  }

  async checkToken(token: string):Promise<TokenResponse>  {
    let result;

      result = {
        status: 200,
        success: true,
        token: token,
        expiresIn: await this.getExpirationTime(token),
      };
    
    return result;
    
  }

  async updateToken(email: string, newToken: string) {
    let updateData:Partial<TokenAuthDTO> = {
        token: newToken,
        createdAt: new Date()
    }
    this.tokenModel.findOneAndUpdate({email}, updateData).exec();

  }

  async getExpirationTime(token: string):Promise<number>{
    let expiresIn: number | PromiseLike<number>;
    await this.jwtService.verifyAsync(token).then(res => {
      const currentUnixTimestamp = Math.floor(Date.now() / 1000)
        expiresIn = res.exp - currentUnixTimestamp
    }).catch(err => {
      console.error(err);
    })
    return expiresIn;
  }
}
