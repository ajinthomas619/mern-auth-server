 import { Request,Response, response } from "express";


export default(dependencies:any) =>{
    

    const{useCase:{addUser_useCase}} = dependencies;
    const addUser = async(req:Request,res:Response)=>{
     console.log("bodyyy",req.body)

     const {firstname,lastname,email,password,mobile} = req.body
     const data ={
        firstname:firstname,
        lastname:lastname,
        email:email,
        mobile:mobile,
        password:password
    }
    console.log("okdaaaa == ",data)
     if (!firstname || !lastname || (!email && !mobile) || !password ) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = await addUser_useCase(dependencies).executeFunction({firstname,lastname,email,mobile,password})
    if(user?.status){
        const {data,otp} = user
        console.log("sessio -",req.session)
       req.session.userData = data
       console.log("data=====",data)
       req.session.otp = otp
       console.log("otp===",otp)
       res.json({
        status: response?.status,

       })

    }
    else{
        console.log(user.message)
        res.json({status:false,message:user?.message})
    }


}  
return addUser

}