"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * APIログインチケット
 * id tokenからユーザーネームを取り出すためのシンプルなクラス
 */
class LoginTicket {
    /**
     * constructor
     */
    constructor(params) {
        this.envelope = params.envelope;
        this.payload = params.payload;
    }
    /**
     * ユーザーネームを取り出す
     */
    getUsername() {
        if (this.payload !== undefined) {
            return this.payload['cognito:username'];
        }
        return;
    }
}
exports.LoginTicket = LoginTicket;
