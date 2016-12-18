/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MotionpictureService } from './motionpicture.service';

describe('MotionpictureService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MotionpictureService]
        });
    });

    it('should ...', inject([MotionpictureService], (service: MotionpictureService) => {
        expect(service).toBeTruthy();
    }));
});
