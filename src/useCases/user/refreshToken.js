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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokeUsecase = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../../utils/jwt");
const refreshTokeUsecase = (dependencies) => __awaiter(void 0, void 0, void 0, function* () {
    const { repository: { userRepository } } = dependencies;
    const refreshSecret = process.env.REFRESH_SECRET_KEY;
    if (!userRepository) {
        return { status: false, message: "repository not found" };
    }
    const executeFunction = (token) => __awaiter(void 0, void 0, void 0, function* () {
        let playload;
        jsonwebtoken_1.default.verify(token, refreshSecret, (err, decode) => {
            if (err) {
                console.log(err);
                return { status: false, message: 'error in jwt sign' };
            }
            else {
                playload = decode;
            }
        });
        if (!playload.user) {
            return { status: false, message: "playload not found" };
        }
        const user = yield userRepository.getUserById(playload.user.id);
        if (!user) {
            return { status: false, message: "no user" };
        }
        const accessToken = (0, jwt_1.createAccessToken)(user, process.env.ACCESS_SECRET_KEY, process.env.ACCESS_EXPIRY);
        return { status: true, accessToken };
    });
    return { executeFunction };
});
exports.refreshTokeUsecase = refreshTokeUsecase;
