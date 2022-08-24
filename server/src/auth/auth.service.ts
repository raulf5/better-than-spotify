import { Injectable } from '@nestjs/common';
import SpotifyWebApi from 'spotify-web-api-node';

@Injectable()
export class AuthService {

   async login(code:string):Promise<any>{
    try {


         const spotifyApi = new SpotifyWebApi({
            redirectUri: process.env.REDIRECT_URI,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
         })
         const data = await spotifyApi.authorizationCodeGrant(code);
         console.log('DATA',data.body);

         return {
            accessToken:data.body.access_token,
            refreshToken:data.body.refresh_token,
            expiresIn:data.body.expires_in
        };
    } catch (error) {
        console.error(error);
    }
    }
    async refresh(refreshToken:string):Promise<any>{
        try {

            const spotifyApi = new SpotifyWebApi({
                redirectUri: process.env.REDIRECT_URI,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken,
              })

              const data = await spotifyApi.refreshAccessToken();
              console.log('REFRESH',data.body);

              return data.body;
        } catch (error) {
            console.log(error);
        }
    }

}
