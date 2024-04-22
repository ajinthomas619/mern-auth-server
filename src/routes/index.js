"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const routes = (dependencies) => {
    const routes = express_1.default.Router();
    routes.use('/', (0, userRoutes_1.default)(dependencies));
    return routes;
};
exports.routes = routes;
