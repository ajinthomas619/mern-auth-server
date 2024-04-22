"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authMiddleware = (req, res, next) => {
    console.log("Auth Middleware");
    if (!req.headers.authorization) {
        console.log("No Header");
        throw new Error("Not Authorized");
    }
    else {
        try {
            console.log("tryyy");
            console.log(req.headers.authorization);
            const token = req.headers.authorization.split(' ')[1];
            const secretKey = process.env.ACCESS_SECRET_KEY;
            const decode = jsonwebtoken_1.default.verify(token, secretKey);
            console.log("decode :=", decode);
            next();
        }
        catch (error) {
            console.log(error);
            throw new Error('Invalid Token');
        }
    }
};
exports.default = authMiddleware;
