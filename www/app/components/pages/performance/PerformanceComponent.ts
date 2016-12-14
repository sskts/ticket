import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'performance',
    template: `
        <header pageName="チケット購入"></header>
        <div class="contents performance">
            <ul>
                <li *ngFor="let performance of performanceList">
                    <div class="date"></div>
                    <div class="date"></div>
                    <div class="date"></div>
                </li>
            </ul>
        </div>
        <navigation activeNo="2"></navigation>
    `
})
export class PerformanceComponent implements OnInit {
    public performanceList: any[];

    constructor(private router:Router) {
        
    }

    /**
     * 初期化
     */
    public ngOnInit() {
        this.performanceList = [];
    }
}

