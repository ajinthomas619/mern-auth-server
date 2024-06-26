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
const express_1 = require("express");
exports.default = (dependencies) => {
    const { useCase: { addUser_useCase } } = dependencies;
    const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("bodyyy", req.body);
        console.log("session in signup controller", req.session);
        const { firstname, lastname, email, password, mobile } = req.body;
        const data = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            mobile: mobile,
            password: password
        };
        console.log("okdaaaa == ", data);
        if (!firstname || !lastname || (!email && !mobile) || !password) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const otp = Math.floor(Math.random() * 9000 + 1000);
        console.log(otp);
        const user = yield addUser_useCase(dependencies).executeFunction({ firstname, lastname, email, mobile, password, otp });
        if (user === null || user === void 0 ? void 0 : user.status) {
            const { data } = user;
            res.json({
                status: express_1.response === null || express_1.response === void 0 ? void 0 : express_1.response.status, data: data, id: data._id
            });
        }
        else {
            console.log(user.message);
            res.json({ status: false, message: user === null || user === void 0 ? void 0 : user.message });
        }
    });
    return addUser;
};
