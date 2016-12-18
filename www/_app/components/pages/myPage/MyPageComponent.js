"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const router_1 = require('@angular/router');
let MyPageComponent = class MyPageComponent {
    constructor(router) {
        this.router = router;
        this.ticketList = [];
    }
    /**
     * 初期化
     */
    ngOnInit() {
        this.ticketList = [
            {
                title: 'バイオハザード：ザ・ファイナル',
                date: '2016/12/23',
                theater: 'シネマサンシャイン池袋',
                screen: 'スクリーン2',
                url: 'https://devsasakiticketfrontendprototypewebapp.azurewebsites.net/purchase/seatSelect?type=app'
            },
            {
                title: 'バイオハザード：ザ・ファイナル',
                date: '2016/12/23',
                theater: 'シネマサンシャイン池袋',
                screen: 'スクリーン2',
                url: 'https://devsasakiticketfrontendprototypewebapp.azurewebsites.net/purchase/seatSelect?type=app'
            },
            {
                title: 'バイオハザード：ザ・ファイナル',
                date: '2016/12/23',
                theater: 'シネマサンシャイン池袋',
                screen: 'スクリーン2',
                url: 'https://devsasakiticketfrontendprototypewebapp.azurewebsites.net/purchase/seatSelect?type=app'
            }
        ];
    }
    /**
     * SMS送信
     */
    sendSms(data) {
        if (device.platform === 'iOS') {
            location.href = `sms:;body=${data.url}`;
        }
        else {
            location.href = `sms:?body=${data.url}`;
        }
    }
};
MyPageComponent = __decorate([
    core_1.Component({
        selector: 'mypage',
        template: `
        <header pageName="マイページ"></header>
        <div class="contents">
            <p *ngIf="ticketList.length === 0">ticketがありません</p>
            <ul class="box">
                <li *ngFor="let ticket of ticketList">
                    <div class="title">{{ticket.title}}</div>
                    <div class="date">{{ticket.date}}</div>
                    <div class="theater">{{ticket.theater}}</div>
                    <div class="screen">{{ticket.screen}}</div>
                    <div class="button blue-button" (click)="sendSms(ticket)">SMS送信</div>
                </li>
            </ul>
        </div>
        <navigation activeNo="1"></navigation>
    `
    }), 
    __metadata('design:paramtypes', [router_1.Router])
], MyPageComponent);
exports.MyPageComponent = MyPageComponent;
