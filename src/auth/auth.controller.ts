import { Body, Controller, Post } from '@nestjs/common';
import { RegisterAuthDTO } from './dto/register-auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginAuthDTO } from './dto/login-auth.dto';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

@Post('v1/register')
registerUsert(@Body() userObject: RegisterAuthDTO) {
    return this.authService.register(userObject)
}
@Post('v1/login')
loginUser(@Body() userObjectLogin:LoginAuthDTO){
    return this.authService.login(userObjectLogin);
}
}