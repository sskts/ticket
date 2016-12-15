import { Component, Input } from '@angular/core';

@Component({
    selector: 'navigation',
    template: `
        <div class="navigation">
            <ul class="d-table">
                <li [ngClass]="{active: activeNo==='0'}" class="d-td" routerLink="/"><div class="inner">TOP</div></li>
                <li [ngClass]="{active: activeNo==='1'}" class="d-td"  routerLink="/myPage"><div class="inner">マイページ</div></li>
                <li [ngClass]="{active: activeNo==='2'}" class="d-td" routerLink="/performance"><div class="inner">チケット購入</div></li>
                <li [ngClass]="{active: activeNo==='3'}" class="d-td"><div class="inner">キャンペーン</div></li>
            </ul>
        </div>
    `
})

export class NavigationComponent {
    @Input() activeNo: string;
}

