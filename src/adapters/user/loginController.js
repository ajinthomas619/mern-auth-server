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
    const { useCase: { userLogin_useCase } } = dependencies;
    const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        console.log("reqbodyyy ===", req.body);
        // console.log("session request in login controller ===",req.session);
        const response = yield userLogin_useCase(dependencies)(email, password);
        console.log("the reeeeeee", response);
        if (!(response === null || response === void 0 ? void 0 : response.status)) {
            res.json({ status: false, message: response.message });
        }
        else {
            const { user, user_accessToken, user_refreshToken } = response;
            req.session.refreshtoken = user_refreshToken;
            console.log("user refresh token", req.session.refreshtoken);
            res.cookie("user_accessToken", user_accessToken, {
                maxAge: 300000,
                httpOnly: true,
                secure: true
            });
            res.cookie("user_refreshToken", user_refreshToken, {
                maxAge: 3600000,
                httpOnly: true,
                secure: true,
                sameSite: "strict",
            });
            res.status(201).json({ status: true, accessToken: user_accessToken, user: user });
        }
    });
    return loginUserController;
};
