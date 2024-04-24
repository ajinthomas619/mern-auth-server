 import { Request,Response, response } from "express";


export default(dependencies:any) =>{
    

    const{useCase:{addUser_useCase}} = dependencies;
    const addUser = async(req:Request,res:Response)=>{
  
    

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
    const otp = Math.floor(Math.random() * 9000 + 1000);
    console.log(otp);
    const user = await addUser_useCase(dependencies).executeFunction({firstname,lastname,email,mobile,password,otp})
    if(user?.status){
        

        const {data} = user
     
 
       res.json({
        status: response?.status,data:data,id:data._id

       })

    }
    else{
        console.log(user.message)
        res.json({status:false,message:user?.message})
    }


}  
return addUser

}


