
import { createAccessToken,createRefreshToken} from "../../utils/jwt"
import { hashPassword } from "../../helpers";
import { UserData } from "../../utils/interfaces/userinterface";
import { User } from "../../app/database/Schema/userSchema";
import user from "../../adapters/user";


export const verifyOtp_Usecase = (dependencies:any) => {
    const {
        repository: { userRepository },
    } = dependencies;
      
const executeFunction = async(userId:any,enteredOtp:any) => {
    const user = await User.findById(userId)
   
    if(enteredOtp == user?.otp){
        const updateduser = await User.findByIdAndUpdate(userId,{isVerified:true},{new:true})
        
        if(updateduser){
            const accessToken = createAccessToken(
                updateduser,
                process.env.ACCESS_SECRET_KEY || 'accesssecret',
                process.env.ACCESS_EXPIRY|| "1h"
                )
            const refreshtToken = createRefreshToken(
                updateduser,
                process.env.REFRESH_SECRET_KEY||"refreshsecret",
                process.env.REFRESH_EXPIRY||"30day"
                )
            return { status:true , accessToken:accessToken,refreshToken:refreshtToken,user:updateduser,message:"otp verified"}
        }
        else{
            return { status :false}
        }

    }
    else{return {status:false,message: "Invalid OTP!"}}


}
return{
    executeFunction
}
}

