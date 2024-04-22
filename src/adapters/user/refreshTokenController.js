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
exports.default = (dependencies) => {
    const { useCase: { refreshTokeUsecase } } = dependencies;
    const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const reference = yield refreshTokeUsecase(dependencies);
        const { executeFunction } = reference;
        // Cast req.session to CustomSession
        const customSession = req.session;
        const token = customSession.refreshToken; // Access refreshToken property
        if (!token) {
            return res.status(403).json('Token not found');
        }
        const NewAccessToken = yield executeFunction(token);
        if (!NewAccessToken) {
            return res.status(203).json(NewAccessToken.message);
        }
        res.status(200).send(NewAccessToken.accessToken);
    });
    return refreshToken;
};
