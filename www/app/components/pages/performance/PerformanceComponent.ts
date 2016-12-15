import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
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
})
export class PerformanceComponent implements OnInit {
    public performanceList: any[];

    constructor(private router:Router) {
        this.performanceList = [];
    }

    /**
     * 初期化
     */
    public ngOnInit() {
        
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
        ]
        
    }

    /**
     * 選択
     */
    public performanceSelect(url: string) {
        let options: string = "location=no, toolbar=yes, hidden=yes";
        let ref: InAppBrowser = window.open(url, '_blank', options);
        ref.addEventListener('onloadstart', (type: InAppBrowserEvent)=>{
            console.log(type);
        });
        ref.addEventListener('exit', (type: InAppBrowserEvent)=>{
            alert(JSON.stringify(type));
        });
        ref.show();
    }
}

