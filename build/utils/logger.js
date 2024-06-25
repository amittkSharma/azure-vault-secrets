"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const pino_1 = require("pino");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pretty = require("pino-pretty");
const stream = pretty({
    colorize: true,
    translateTime: true,
});
exports.log = (0, pino_1.pino)(stream);
