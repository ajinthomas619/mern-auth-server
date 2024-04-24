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
exports.default = (dependencies) => {
    const { useCase: { verifyOtp_Usecase }, } = dependencies;
    const verifyOtpcontroller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const enteredOtp = req.body.otp;
        const userid = req.body.id;
        console.log("body", req.body);
        const response = yield verifyOtp_Usecase(dependencies).executeFunction(userid, enteredOtp);
        if (response.status) {
            const { accessToken, refreshtToken } = response;
            const user = response.user;
            req.session.refreshtoken = refreshtToken;
            res.cookie("user-accessToken", accessToken, {
                maxAge: 300000,
                httpOnly: true,
                secure: true
            });
            res.cookie("user-refreshToken", refreshtToken, {
                maxAge: 360000,
                httpOnly: true,
                secure: true
            });
            console.log(user, "user user ");
            console.log(user._id, "user._id user._id ");
            res.status(201).json({ status: true, accessToken: accessToken, user: user });
        }
        else {
            res.status(401).json({ status: false, message: response.message });
        }
    });
    return verifyOtpcontroller;
};
