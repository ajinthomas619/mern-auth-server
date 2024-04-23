import { Request,Response } from "express";



export default (dependencies:any) => {
    const {
        useCase: {verifyOtp_Usecase},
    } = dependencies

const verifyOtpcontroller = async (req:Request, res:Response) => {
    const enteredOtp = req.body.otp
    const otp  = req.session.otp
    const userData =  req.session.userData
    console.log("body",req.body)

    const response = await verifyOtp_Usecase(dependencies).executeFunction(
        userData,
        otp,
        enteredOtp
    )
    console.log("otpent--",otp)
    
console.log("the session for verify otp",req.session)
        
        if(response.status){


            const { accessToken,refreshtToken} = response
            const user = response.user.user


            req.session.refreshtoken = refreshtToken;
            res.cookie("user-accessToken",accessToken,{
                maxAge: 300000,
                httpOnly:true,
                secure:true
            })
            res.cookie("user-refreshToken",refreshtToken,{
                maxAge:360000,
                httpOnly:true,
                secure:true
            })
            console.log(user ,"user user ");
            console.log(user._id ,"user._id user._id ");
            
            res.status(201).json({status: true,accessToken: accessToken,user: user})
        }else{
            res.status(401).json({status:false,message:response.message})
        } 
        
    
    return verifyOtpcontroller
}

}
