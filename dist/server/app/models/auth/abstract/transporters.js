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
/**
 * transporters
 */
const createDebug = require("debug");
const fetch = require("isomorphic-fetch");
const debug = createDebug('sskts-ticket:transporters');
/**
 * トランスポーター抽象クラス
 */
class Transporter {
}
exports.Transporter = Transporter;
/**
 * RequestError
 */
class RequestError extends Error {
    constructor(message) {
        // tslint:disable-next-line:no-single-line-block-comment
        super(message) /* istanbul ignore next */;
        this.name = 'ChevreRequestError';
    }
}
exports.RequestError = RequestError;
/**
 * DefaultTransporter
 */
class DefaultTransporter {
    constructor(expectedStatusCodes) {
        this.expectedStatusCodes = expectedStatusCodes;
    }
    /**
     * Configures request options before making a request.
     */
    static CONFIGURE(options) {
        // set transporter user agent
        // options.headers = (options.headers !== undefined) ? options.headers : {};
        // tslint:disable-next-line:no-single-line-block-comment
        /* istanbul ignore else */
        // if (!(<any>options.headers)['User-Agent']) {
        //     (<any>options.headers)['User-Agent'] = DefaultTransporter.USER_AGENT;
        // } else if ((<any>options.headers)['User-Agent'].indexOf(DefaultTransporter.USER_AGENT) === -1) {
        //     (<any>options.headers)['User-Agent'] = `${(<any>options.headers)['User-Agent']} ${DefaultTransporter.USER_AGENT}`;
        // }
        return options;
    }
    /**
     * Makes a request with given options and invokes callback.
     */
    fetch(url, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const fetchOptions = DefaultTransporter.CONFIGURE(options);
            debug('fetching...', url, fetchOptions);
            return fetch(url, fetchOptions).then((response) => __awaiter(this, void 0, void 0, function* () { return this.wrapCallback(response); }));
        });
    }
    /**
     * Wraps the response callback.
     */
    wrapCallback(response) {
        return __awaiter(this, void 0, void 0, function* () {
            let err = new RequestError('An unexpected error occurred');
            debug('request processed', response.status);
            if (this.expectedStatusCodes.indexOf(response.status) < 0) {
                // Consider all 4xx and 5xx responses errors.
                let body;
                try {
                    // Only and only application/json responses should
                    // be decoded back to JSON, but there are cases API back-ends
                    // responds without proper content-type.
                    body = yield response.clone().json();
                }
                catch (error) {
                    body = yield response.clone().text();
                }
                if (typeof body === 'object' && body.error !== undefined) {
                    err = new RequestError(body.error.message);
                    err.code = response.status;
                    err.errors = body.error.errors;
                }
                else {
                    err = new RequestError(body);
                    err.code = response.status;
                    err.errors = [];
                }
            }
            else {
                return response;
            }
            throw err;
        });
    }
}
exports.DefaultTransporter = DefaultTransporter;
