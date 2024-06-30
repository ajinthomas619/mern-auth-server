import {app } from './app';
import connectDB from './config/db';


const PORT = process.env.PORT || 8080
const start = async() =>{
    try{
        console.log('hi da');
       await connectDB()
     console.log('connected to database')
       
app.listen(PORT,()=>{
    console.log('server started')
})
    }
    catch(error){
        console.log(error)
    }
}



start()  