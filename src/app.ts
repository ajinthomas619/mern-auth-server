import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { routes } from './routes';
import dependencies from './config/dependencies';
import session, {MemoryStore,SessionOptions,SessionData} from 'express-session';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()

declare module 'express-session'{
  interface Session{
    userData: {
      _id:string,
      firstname:string
      lastname:string,
      email:string,
      password:string,
      mobile:string
    }
    otp:string ,
    refreshtoken:string
  }
}

const app =express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
const store = new MemoryStore()
const allowedOrigins = ['mern-auth-client-fawn.vercel.app'];
const allowCrossDomain = (req:Request, res:Response, next:NextFunction) => {
  res.header(`Access-Control-Allow-Origin`,` https://mern-auth-client-fawn.vercel.app`);    
  res.header("Access-Control-Allow-Credentials", "true");
  //res.header("Access-Control-Expose-Headers", "true");
  res.header(`Access-Control-Allow-Methods`,` GET,PUT,OPTIONS,POST,DELETE,HEAD`);
  res.header("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
  };
app.use(allowCrossDomain)
app.use(
  session({

    secret: process.env.SESSION_SECRET_KEY,
     resave:false,
     saveUninitialized:false,
     cookie: {
      maxAge :30*60*60*1000,
      httpOnly : true,
     },
     store:store,
  }as SessionOptions)
)

app.use("/api",routes(dependencies));






export {app}

