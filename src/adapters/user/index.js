"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loginController_1 = __importDefault(require("./loginController"));
const signupController_1 = __importDefault(require("./signupController"));
const verifyOtpController_1 = __importDefault(require("./verifyOtpController"));
const logoutController_1 = __importDefault(require("./logoutController"));
const refreshTokenController_1 = __importDefault(require("./refreshTokenController"));
exports.default = (dependencies) => {
    return {
        signupControler: (0, signupController_1.default)(dependencies),
        verifyOtpController: (0, verifyOtpController_1.default)(dependencies),
        loginController: (0, loginController_1.default)(dependencies),
        logoutController: (0, logoutController_1.default)(dependencies),
        refreshTokenController: (0, refreshTokenController_1.default)(dependencies)
    };
};
