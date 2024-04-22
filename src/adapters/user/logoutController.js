"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../../utils/jwt");
exports.default = (dependencies) => {
    const logoutController = (req, res) => {
        console.log("cookie:=", req.cookies);
        try {
            (0, jwt_1.clearAccessTokenFromCookie)("accessToken", res);
            res.clearCookie("accessToken");
            console.log("success");
            res.json({ status: true, message: "Logged out successfully." });
        }
        catch (error) {
            console.log(error, "errorr");
            res.json(error);
        }
    };
    return logoutController;
};
