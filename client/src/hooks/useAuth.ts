import { useState, useEffect } from 'react'
import axios from 'axios';
import { VARS } from '../helpers';
import {authService} from '../services/auth'
export default function useAuth(code: string) {
debugger;
    const { apiUrl } = VARS;
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    useEffect(() => {
        let isSubscribed = true;
        const fetchData = async () => {
            try {
                // const result = await axios.post(
                //     apiUrl?.concat('/auth/login') as string, {
                //     code
                // });
                const result = await authService.login(code)

                if (isSubscribed) {
                    console.log("RESULTADO",result.data.accessToken);
                    setAccessToken(result.data.accessToken);
                    setRefreshToken(result.data.refreshToken)
                    setExpiresIn(result.data.expiresIn)
                    window.history.pushState({}, "", "/")
                }
            } catch (error) {
                console.log(error);
                window.location.href = "/";
            }
        }

        fetchData().catch(console.error);
        return () => {isSubscribed = false};
    }, [code])

    useEffect(() => {
    //     let isRefreshSubscribed = true;
    //     console.log('REFRESHTOKEN',refreshToken);

    if(!refreshToken || !expiresIn) return
    const interval = setInterval(() => {
        const fetchData = async () => {
            try {
                const result = await axios.post(
                    apiUrl?.concat('/auth/refresh') as string, {
                        refreshToken
                });
    //             if (isRefreshSubscribed) {
                    console.log("RESULTADO_REFRESH",result.data.accessToken);
                    setAccessToken(result.data.accessToken);
                    setExpiresIn(result.data.expiresIn)
    //             }
            } catch (error) {
                console.log(error);
    //             // window.location.href = "/";
            }
        }

        fetchData().catch(console.error);
    //     return () => {isRefreshSubscribed = false};
}, (expiresIn - 60) * 1000)

return () => clearInterval(interval)
    }, [refreshToken, expiresIn])

    return accessToken;

}
