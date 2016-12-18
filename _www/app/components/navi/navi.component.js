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
let NaviComponent = class NaviComponent {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() {
        this.router.events.subscribe((value) => {
            if (value.url === ('/index')) {
                this.activeNo = '0';
            }
            else if (value.url === ('/myPage')) {
                this.activeNo = '1';
            }
            else if (value.url === ('/performance')) {
                this.activeNo = '2';
            }
        });
    }
};
NaviComponent = __decorate([
    core_1.Component({
        selector: 'app-navi',
        templateUrl: 'app/components/navi/navi.component.html',
        styleUrls: ['app/components/navi/navi.component.scss']
    }), 
    __metadata('design:paramtypes', [router_1.Router])
], NaviComponent);
exports.NaviComponent = NaviComponent;
