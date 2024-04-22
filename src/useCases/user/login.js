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
exports.userLogin_useCase = void 0;
const jwt_1 = require("../../utils/jwt");
const helpers_1 = require("../../helpers");
const userLogin_useCase = (dependencies) => {
    const { repository: { userRepository }, } = dependencies;
    const executeFunction = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (userRepository === null || userRepository === void 0 ? void 0 : userRepository.findUser(email));
        console.log("resp =>>>", response);
        if (!response.status) {
            return { status: false, message: response === null || response === void 0 ? void 0 : response.message };
        }
        else {
            const { user } = response;
            const validPass = yield (0, helpers_1.comparePassword)(password, user.password);
            console.log("validpass=>>", validPass);
            if (validPass) {
                const user_accessToken = (0, jwt_1.createAccessToken)(user, process.env.ACCESS_SECRET_KEY || '', process.env.ACCESS_EXPIRY || '');
                const user_refreshToken = (0, jwt_1.createRefreshToken)(user, process.env.REFRESH_SECRET_KEY || '', process.env.REFRESH_EXPIRY || '');
                console.log('access tokennn', user_accessToken);
                console.log('refresh token', user_refreshToken);
                return { status: true, user: user, user_accessToken: user_accessToken, user_refreshToken: user_refreshToken };
            }
            else {
                return { status: false, message: "Email and Password is incorrect" };
            }
        }
    });
    return executeFunction;
};
exports.userLogin_useCase = userLogin_useCase;
