"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtp = void 0;
const nodemailer = require('nodemailer');
const otp = Math.floor(Math.random() * 9000 + 1000);
console.log(otp);
const sendOtp = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "stmp.forwardmail.net",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: "kidiloski619@gmail.com",
            pass: 'hbwwvctqwvgcwajm',
        },
    });
    const info = yield transporter.sendMail({
        from: "kidiloski619@gmail.com",
        to: email,
        subject: "Verify your Account",
        text: `Your otp is ${otp}`,
        html: `<b> 
    <p> Your OTP for verification is : ${otp}</p
 
    </b>`,
    });
    if (info) {
        return { status: true, otp: otp };
    }
    else {
        return { status: false, message: "error in Nodemailer client" };
    }
});
exports.sendOtp = sendOtp;
