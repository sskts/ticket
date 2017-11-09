/**
 * ScheduleServiceテスト
 */
import { inject, TestBed } from '@angular/core/testing';
import { ScheduleService } from './schedule.service';

describe('ScheduleService', () => {
    it('getMovieTheaters 正常 movieTheaters.length === 0', async () => {
        const jsonpStub: any = {
            get: () => {
                return {
                    retry: () => {
                        return {
                            toPromise: () => {
                                return Promise.resolve({
                                    json: () => {
                                        return { error: null, result: [{}, {}] };
                                    }
                                });
                            }
                        };
                    }
                };
            }
        };
        const service = new ScheduleService(jsonpStub);
        const movieTheaters = await service.getMovieTheaters();
        expect(movieTheaters.length).toBe(2);
    });

    it('getMovieTheaters 正常 movieTheaters.length > 0', async () => {
        const jsonpStub: any = {};
        const service = new ScheduleService(jsonpStub);
        const data: any = {};
        service.movieTheaters = [data, data];
        const movieTheaters = await service.getMovieTheaters();
        expect(movieTheaters.length).toBe(2);
    });
});
