import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MotionpictureService, performancesResult, performance } from '../../services/motionpicture/motionpicture.service';
import { environment } from '../../../environments/environment';
const moment = require('moment');

@Component({
    selector: 'app-performance',
    templateUrl: './performance.component.html',
    styleUrls: ['./performance.component.scss'],
    providers: [MotionpictureService],
})
export class PerformanceComponent implements OnInit {
    public config: any = environment;
    public performances: any[];
    public moment = moment;

    constructor(private router: Router, private motionpictureService: MotionpictureService) {
        
    }

    /**
     * 初期化
     */
    public ngOnInit() {
        let day: string = moment().format('YYYYMMDD');
        day = '20161223';
        this.performances = [];
        this.motionpictureService.getPerformances(day).subscribe(
            (performancesResult: performancesResult) => {
                if (performancesResult.success) {
                    //整形
                    let result: any = [];
                    let count = 0;
                    
                    for (let performance of performancesResult.performances) {
                        if (result.length > 0) {
                            if (result[count].film.name.ja === performance.film.name.ja
                                && result[count].theater === performance.theater
                                && result[count].screen === performance.screen) {
                                result[count].performances.push(performance);
                            } else {
                                result.push({
                                    theater: performance.theater,
                                    theater_name: performance.theater_name,
                                    screen: performance.screen,
                                    screen_name: performance.screen_name,
                                    film: performance.film,
                                    performances: [performance]
                                });
                                count++;
                            }
                        } else {
                            result.push({
                                theater: performance.theater,
                                theater_name: performance.theater_name,
                                screen: performance.screen,
                                screen_name: performance.screen_name,
                                film: performance.film,
                                performances: [performance]
                            });
                        }
                    }
                    this.performances = result;
                    
                }

            },
            (error: any) => {
                console.log(error)
            }
        );


    }

    /**
     * 選択
     */
    public performanceSelect(performanceId: string) {
        let url = `${this.config['purchase_url']}/purchase/seatSelect?id=${performanceId}`;
        let options: string = "location=no, toolbar=yes, hidden=yes";
        let ref: InAppBrowser = window.open(url, '_blank', options);
        ref.addEventListener('onloadstart', (type: InAppBrowserEvent) => {
            console.log(type);
        });
        ref.addEventListener('exit', (type: InAppBrowserEvent) => {
            alert(JSON.stringify(type));
        });
        ref.show();
    }

}
