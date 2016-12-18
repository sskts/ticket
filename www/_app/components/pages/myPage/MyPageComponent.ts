import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
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
})
export class MyPageComponent implements OnInit {
    public ticketList: any[];

    constructor(private router:Router) {
        this.ticketList = [];
    }

    /**
     * 初期化
     */
    public ngOnInit() {
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
    public sendSms(data: any): void {
        if (device.platform === 'iOS') {
            location.href = `sms:;body=${data.url}`;
        } else {
            location.href = `sms:?body=${data.url}`;
        }
    }

    

    
}

