import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import SpotifyWebApi from 'spotify-web-api-node';

@Module({
    

  providers: [AuthService],
    

  controllers: [AuthController]
})
export class AuthModule {}
