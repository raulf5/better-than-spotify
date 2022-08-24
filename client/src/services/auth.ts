import axios from "axios";

export const authService:any = {
    login(code:string){
         axios.post(
            process.env.REACT_APP_API_BASE_URL?.concat('/auth/login') as string, {
            code
        });
    },
}

