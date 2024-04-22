import express from 'express';
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
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }

}))
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

