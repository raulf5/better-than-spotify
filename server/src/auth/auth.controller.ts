import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('login')
    login(@Body() body): Promise<any>{
        const code = body.code;

        return this.authService.login(code);

    }

    @Post('refresh')
    refresh(@Body() body){
        const refreshToken = body.refreshToken;
      
        return this.authService.refresh(refreshToken);
    }

}
