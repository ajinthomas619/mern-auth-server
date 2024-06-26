import { createAccessToken,createRefreshToken } from "../../utils/jwt";
import { comparePassword } from "../../helpers";

export const userLogin_useCase = (dependencies:any) => {
    const {
        repository:{userRepository},
    } = dependencies

 const executeFunction = async(email:string,password:string) => {
    const response = await userRepository?.findUser(email)
  

    if(!response.status){
        return { status:false,message:response?.message}
    }
    else{
        const { user} = response
        const validPass = await comparePassword(password,user.password)
        
        if(validPass){
            const user_accessToken = createAccessToken(
                user,
                process.env.ACCESS_SECRET_KEY || 'mysecret',
                process.env.ACCESS_EXPIRY || '1 h'
            )
            const user_refreshToken = createRefreshToken(
                user,
                process.env.REFRESH_SECRET_KEY || 'mysecret',
                process.env.REFRESH_EXPIRY || '72 h'
            )
       
            return { status:true, user:user,user_accessToken:user_accessToken,user_refreshToken:user_refreshToken}

        }
        else{
            return {status:false,message:"Email and Password is incorrect"}
        }
    }
 }
 return executeFunction
}