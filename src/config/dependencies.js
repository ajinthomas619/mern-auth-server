"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../app/repository");
const create_user_1 = require("../useCases/user/create_user");
const login_1 = require("../useCases/user/login");
const verifyotp_1 = require("../useCases/user/verifyotp");
const useCases_1 = require("../useCases");
const useCase = {
    addUser_useCase: create_user_1.addUser_useCase,
    userLogin_useCase: login_1.userLogin_useCase,
    verifyOtp_Usecase: verifyotp_1.verifyOtp_Usecase,
    refreshTokeUsecase: useCases_1.refreshTokeUsecase
};
const repository = {
    userRepository: repository_1.userRepository
};
exports.default = { useCase, repository };
