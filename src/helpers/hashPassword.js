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
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('hash password');
        const salt = yield bcrypt_1.default.genSalt(10);
        console.log('saltt===', salt);
        console.log("password===", password);
        const hashedPass = yield bcrypt_1.default.hash(password, salt);
        console.log(hashedPass);
        return hashedPass;
    }
    catch (error) {
        console.log(error, 'Error in hashing password');
        throw new Error('Error in hashing password');
    }
});
exports.hashPassword = hashPassword;
const comparePassword = (password, hashedPass) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let match = yield bcrypt_1.default.compare(password, hashedPass);
        return match;
    }
    catch (error) {
        console.log(error, "Error comparing passwords");
        throw new Error('Error in verifiying passwords');
    }
});
exports.comparePassword = comparePassword;
