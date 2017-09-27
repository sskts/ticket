/**
 * ActivatedRouteStub
 */
import { Injectable } from '@angular/core';
import { convertToParamMap, ParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ActivatedRouteStub {

    // ActivatedRoute.paramMap is Observable
    private subject: BehaviorSubject<ParamMap> = new BehaviorSubject(convertToParamMap(this.testParamMap));
    public paramMap: Observable<ParamMap> = this.subject.asObservable();

    // Test parameters
    // tslint:disable-next-line:variable-name
    private _testParamMap: ParamMap;
    get testParamMap() { return this._testParamMap; }
    set testParamMap(params: {}) {
        this._testParamMap = convertToParamMap(params);
        this.subject.next(this._testParamMap);
    }

    // ActivatedRoute.snapshot.paramMap
    get snapshot() {
        return { paramMap: this.testParamMap };
    }
}
