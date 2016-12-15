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
let NavigationComponent = class NavigationComponent {
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', String)
], NavigationComponent.prototype, "activeNo", void 0);
NavigationComponent = __decorate([
    core_1.Component({
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
    }), 
    __metadata('design:paramtypes', [])
], NavigationComponent);
exports.NavigationComponent = NavigationComponent;
