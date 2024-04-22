"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeRefreshToken = exports.clearAccessTokenFromCookie = exports.createRefreshToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createAccessToken = (user, AccessTokensecretkey, Expiration) => {
    console.log("access token creating");
    const token = jsonwebtoken_1.default.sign({ user }, AccessTokensecretkey, {
        expiresIn: Expiration,
    });
    return token;
};
exports.createAccessToken = createAccessToken;
const createRefreshToken = (user, RefreshTokensecretkey, Expiration) => {
    return jsonwebtoken_1.default.sign({ user }, RefreshTokensecretkey, { expiresIn: Expiration });
};
exports.createRefreshToken = createRefreshToken;
const clearAccessTokenFromCookie = (cookieName, res) => {
    res.cookie(cookieName, {
        httpOnly: false,
        secure: false,
        signed: false,
        maxAge: 0,
    });
};
exports.clearAccessTokenFromCookie = clearAccessTokenFromCookie;
const decodeRefreshToken = (token) => {
    const refreshSecret = process.env.REFRESH_SECRET_KEY;
    let playload;
    return jsonwebtoken_1.default.verify(token, refreshSecret, (err, decode) => {
        if (err) {
            console.log(err, Error);
            return { status: false, message: "error in jwt sign" };
        }
        else {
            playload = decode;
            console.log(playload, "decode playloadddd");
            return { status: true, message: "error in jwt sign", data: playload };
        }
    });
};
exports.decodeRefreshToken = decodeRefreshToken;
