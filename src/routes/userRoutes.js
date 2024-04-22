"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adapters_1 = require("../adapters");
exports.default = (dependencies) => {
    const router = express_1.default.Router();
    const { loginController, signupControler, verifyOtpController, logoutController, refreshTokenController } = (0, adapters_1.userController)(dependencies);
    router.post('/login', loginController);
    router.post('/signup', signupControler);
    router.post('/verify-otp', verifyOtpController);
    router.get('/logout', logoutController);
    router.get('/refresh', refreshTokenController);
    return router;
};
