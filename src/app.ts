import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { routes } from "./routes";
import dependencies from "./config/dependencies";
import session, {
  MemoryStore,
  SessionOptions,
  SessionData,
} from "express-session";
import dotenv from "dotenv";


dotenv.config();
const store = new MemoryStore()
declare module "express-session" {
  interface Session {
    userData: {
      _id: string;
      firstname: string;
      lastname: string;
      email: string;
      password: string;
      mobile: string;
    };
    otp: string;
    refreshtoken: string;
  }
}

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(
  cors({
    origin: "https://mern-auth-client-fawn.vercel.app",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY || "tOYVSLenTZTMsS7TzD2",
    resave: false,
    saveUninitialized: false,
    cookie: {
      
      httpOnly:true,
      secure:true,
      maxAge: 30 * 24* 60 * 60 * 1000 
    },
    store:store
  } as SessionOptions)
);

app.use("/api", routes(dependencies));

export { app };
