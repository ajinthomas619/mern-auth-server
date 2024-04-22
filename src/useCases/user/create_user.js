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
const addUser_useCase = (dependencies) => {
    const { repository: { authRepository } } = dependencies;
    const executeFunction = (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userExist = yield (authRepository === null || authRepository === void 0 ? void 0 : authRepository.userEmailExist(data === null || data === void 0 ? void 0 : data.email));
            if (userExist) {
                return { status: false, message: "User Already Exist" };
            }
            const response = yield (0, helpers_1.sendOtp)(data === null || data === void 0 ? void 0 : data.email);
            if (response === null || response === void 0 ? void 0 : response.status) {
                const { otp } = response;
                return { status: true, data, otp: otp };
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
