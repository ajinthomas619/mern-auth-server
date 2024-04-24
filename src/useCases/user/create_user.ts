import { UserData } from "../../entities";
import { sendOtp } from "../../helpers";
import { User } from "../../app/database/Schema/userSchema";
import { hashPassword } from "../../helpers";

export const addUser_useCase =(dependencies: any)=>{
    const{ repository: { userRepository}} = dependencies;

    const executeFunction = async(data: UserData) =>{
        try{
        
        const userExist = await userRepository?.userEmailExist(data?.email);
    if(userExist){
        return { status: false, message: "User Already Exist"}
    }
    const response = await sendOtp(data?.email,data?.otp);
    if(response?.status){
      
        const otp  = data.otp;
      
        const hashedPassword = await hashPassword(data?.password??"");
         const updatedData = {...data,password:hashedPassword}
        const addUserData = await userRepository.createUser(updatedData)
        return { status:true,data:addUserData,otp:otp}

    }else{
        return {status: false,message:'invalid otp'}
    }
        } catch(error){
            console.error('Error creating user:',error)
            return {status: false,message:'An error occured'}
        }
    
    };
    return {
        executeFunction,
    }
};