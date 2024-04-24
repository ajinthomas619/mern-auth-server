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
exports.verifyOtp_Usecase = void 0;
const jwt_1 = require("../../utils/jwt");
const userSchema_1 = require("../../app/database/Schema/userSchema");
const verifyOtp_Usecase = (dependencies) => {
    const { repository: { userRepository }, } = dependencies;
    const executeFunction = (userId, enteredOtp) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield userSchema_1.User.findById(userId);
        console.log("user details for verifiying otp", user);
        if (enteredOtp == (user === null || user === void 0 ? void 0 : user.otp)) {
            const updateduser = yield userSchema_1.User.findByIdAndUpdate(userId, { isVerified: true }, { new: true });
            if (updateduser) {
                const accessToken = (0, jwt_1.createAccessToken)(updateduser, process.env.ACCESS_SECRET_KEY || 'accesssecret', process.env.ACCESS_EXPIRY || "1h");
                const refreshtToken = (0, jwt_1.createRefreshToken)(updateduser, process.env.REFRESH_SECRET_KEY || "refreshsecret", process.env.REFRESH_EXPIRY || "30day");
                return { status: true, accessToken: accessToken, refreshToken: refreshtToken, user: updateduser, message: "otp verified" };
            }
            else {
                return { status: false };
            }
        }
        else {
            return { status: false, message: "Invalid OTP!" };
        }
    });
    return {
        executeFunction
    };
};
exports.verifyOtp_Usecase = verifyOtp_Usecase;
