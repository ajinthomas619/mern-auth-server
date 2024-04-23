
import { createAccessToken,createRefreshToken} from "../../utils/jwt"
import { hashPassword } from "../../helpers";
import { UserData } from "../../utils/interfaces/userinterface";


export const verifyOtp_Usecase = (dependencies:any) => {
    const {
        repository: { userRepository },
    } = dependencies;
      
const executeFunction = async(data:UserData,otp:any,enteredOtp:any) => {
    if(enteredOtp == otp){
        console.log("orginal data====",data.password)
        const hashedPassword = await hashPassword(data?.password);
         const updatedData = {...data,password:hashedPassword}
        const addUserData = await userRepository.createUser(updatedData)
        console.log("addUserData===",addUserData)
        if(addUserData.status){
            const accessToken = createAccessToken(
                addUserData,
                process.env.ACCESS_SECRET_KEY || 'accesssecret',
                process.env.ACCESS_EXPIRY|| "1h"
                )
            const refreshtToken = createRefreshToken(
                addUserData,
                process.env.REFRESH_SECRET_KEY||"refreshsecret",
                process.env.REFRESH_EXPIRY||"30day"
                )
            return { status:true , accessToken:accessToken,refreshToken:refreshtToken,user:addUserData,message:"otp verified"}
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

