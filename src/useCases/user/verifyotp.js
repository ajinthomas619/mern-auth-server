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
const helpers_1 = require("../../helpers");
const verifyOtp_Usecase = (dependencies) => {
    const { repository: { userRepository }, } = dependencies;
    const executeFunction = (data) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("orginal data====", data.password);
        const hashedPassword = yield (0, helpers_1.hashPassword)(data === null || data === void 0 ? void 0 : data.password);
        const updatedData = Object.assign(Object.assign({}, data), { password: hashedPassword });
        const addUserData = yield userRepository.createUser(updatedData);
        console.log("addUserData===", addUserData);
        if (addUserData.status) {
            const accessToken = (0, jwt_1.createAccessToken)(addUserData, process.env.ACCESS_SECRET_KEY, process.env.ACCESS_EXPIRY);
            const refreshtToken = (0, jwt_1.createRefreshToken)(addUserData, process.env.REFRESH_SECRET_KEY, process.env.REFRESH_EXPIRY);
            return { status: true, accessToken: accessToken, refreshToken: refreshtToken, user: addUserData, message: "otp verified" };
        }
        else {
            return { status: false };
        }
    });
    return {
        executeFunction
    };
};
exports.verifyOtp_Usecase = verifyOtp_Usecase;
