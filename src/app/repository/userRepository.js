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
const Schema_1 = __importDefault(require("../database/Schema"));
const { User } = Schema_1.default;
exports.default = {
    userEmailExist: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield Schema_1.default.User.findOne({
                "email": email,
            });
            return response;
        }
        catch (error) {
            console.log("Error in userEmailExist", error);
        }
        ;
    }),
    createUser: (data) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("create user");
        const userData = {
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
            mobile: data.mobile,
        };
        const user = yield User.create(userData);
        console.log(user, "helllaaa");
        if (user) {
            return { status: true, message: "user created successfully", user };
        }
        else {
            return { status: false, message: 'user creation failed' };
        }
    }),
    findUser: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield User.findOne({ email: email });
            if (user) {
                return { status: true, user: user };
            }
            else {
                return { status: false, message: 'Email and Password is incorrect ' };
            }
        }
        catch (error) {
            console.log(error, "Error while finding user");
        }
    })
};
