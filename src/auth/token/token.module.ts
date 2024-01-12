import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { SharedAuthModule } from '../shared-auth/shared-auth.module';
@Module({
    imports: [
        SharedAuthModule
    ],
    controllers: [TokenController]
})
export class TokenModule {}
