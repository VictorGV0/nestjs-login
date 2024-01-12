import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TokenService } from '../shared-auth/token.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { Headers } from '@nestjs/common';

@ApiTags('token')
@Controller('api/token')
export class TokenController {
    constructor(private tokenService: TokenService){}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('v1/check')
    async registerUsert(@Headers() headers) {
        return this.tokenService.checkToken(headers.authorization.substring(7))
    }
}
