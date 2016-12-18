import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
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
