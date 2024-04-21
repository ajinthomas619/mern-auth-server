import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
firstname:{
    type: String,
    
    
} ,
lastname:{
    type: String,
    
},
email:{
    type: String,
    required: true,
    

},
password: {
    type: String,
  
},

mobile: {
    type:String,
},
})

const User= mongoose.model("User",userSchema); 
export{ User}