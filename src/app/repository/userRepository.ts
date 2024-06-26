import schemas from "../database/Schema"
import mongoose from "mongoose"
import { hashPassword } from "../../helpers";

const { User } = schemas;

export default{
userEmailExist: async(email: string)=>{
try{
    const response = await schemas.User.findOne({
        "email": email,
    });
    return response;
}
catch(error){
    console.log("Error in userEmailExist", error);
};
},


    createUser: async(data: any) => {
        console.log("create user")
   
     
        const userData = {
            firstname:data.firstname,
            lastname:data.lastname,
            email: data.email,  
            password: data.password, 
            mobile: data.mobile,
            otp:data.otp

        }
        const user = await User.create(userData)
        console.log(user,"helllaaa")
       if(user){
        return{status: true,message:"user created successfully",user}
       }
       else{
        return{status: false,message:'user creation failed'}
       }
        
    },


    findUser:async(email:string) =>{
        try{
            const user = await User.findOne({email:email})
            if(user){
                
                    return{status:true,user:user}
             
            }
            else{
                return{status:false,message:'Email and Password is incorrect '}
            }
        }
        catch(error){
            console.log(error,"Error while finding user")
        }
    
    },
    getUserById:async(id:any) => {
        try {
            const user = await User.findById(id)
            console.log("user by id",user);
            
            if(!user) {
                return{
                status:true,
                data:user
                }
            }
                else{
                    return {status:false}
                }
            
        }
        catch(error){
            console.log("error in get user by id",error)
        }
    }

}