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
exports.addUser_useCase = void 0;
const helpers_1 = require("../../helpers");
const helpers_2 = require("../../helpers");
const addUser_useCase = (dependencies) => {
    const { repository: { userRepository } } = dependencies;
    const executeFunction = (data) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            console.log("user daataa", data);
            const userExist = yield (userRepository === null || userRepository === void 0 ? void 0 : userRepository.userEmailExist(data === null || data === void 0 ? void 0 : data.email));
            if (userExist) {
                return { status: false, message: "User Already Exist" };
            }
            const response = yield (0, helpers_1.sendOtp)(data === null || data === void 0 ? void 0 : data.email, data === null || data === void 0 ? void 0 : data.otp);
            if (response === null || response === void 0 ? void 0 : response.status) {
                console.log("data after response", data);
                const otp = data.otp;
                console.log("otp for veerify", otp);
                console.log("password data====", data === null || data === void 0 ? void 0 : data.password);
                const hashedPassword = yield (0, helpers_2.hashPassword)((_a = data === null || data === void 0 ? void 0 : data.password) !== null && _a !== void 0 ? _a : "");
                const updatedData = Object.assign(Object.assign({}, data), { password: hashedPassword });
                const addUserData = yield userRepository.createUser(updatedData);
                return { status: true, data: addUserData, otp: otp };
            }
            else {
                return { status: false, message: 'invalid otp' };
            }
        }
        catch (error) {
            console.error('Error creating user:', error);
            return { status: false, message: 'An error occured' };
        }
    });
    return {
        executeFunction,
    };
};
exports.addUser_useCase = addUser_useCase;
