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
let PerformanceComponent = class PerformanceComponent {
    constructor(router) {
        this.router = router;
        this.performanceList = [];
    }
    /**
     * 初期化
     */
    ngOnInit() {
        this.performanceList = [
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
     * 選択
     */
    performanceSelect(url) {
        let options = "location=no, toolbar=yes, hidden=yes";
        let ref = window.open(url, '_blank', options);
        ref.addEventListener('onloadstart', (type) => {
            console.log(type);
        });
        ref.addEventListener('exit', (type) => {
            alert(JSON.stringify(type));
        });
        ref.show();
    }
};
PerformanceComponent = __decorate([
    core_1.Component({
        selector: 'performance',
        template: `
        <header pageName="チケット購入"></header>
        <div class="contents performance">
            <p *ngIf="performanceList.length === 0">performanceがありません</p>
            <ul class="box">
                <li *ngFor="let performance of performanceList">
                    <div class="title">{{performance.title}}</div>
                    <div class="date">{{performance.date}}</div>
                    <div class="theater">{{performance.theater}}</div>
                    <div class="screen">{{performance.screen}}</div>
                    <div class="button blue-button" (click)="performanceSelect(performance.url)">選択</div>
                </li>
            </ul>
        </div>
        <navigation activeNo="2"></navigation>
    `
    }), 
    __metadata('design:paramtypes', [router_1.Router])
], PerformanceComponent);
exports.PerformanceComponent = PerformanceComponent;
