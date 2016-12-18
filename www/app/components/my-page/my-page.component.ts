import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-page',
  templateUrl: 'app/components/my-page/my-page.component.html',
  styleUrls: ['app/components/my-page/my-page.component.scss']
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
