/**
 * PurchaseServiceテスト
 */
import { inject, TestBed } from '@angular/core/testing';
import { PurchaseService } from './purchase.service';

describe('PurchaseService', () => {
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
        const service = new PurchaseService(jsonpStub);
        const movieTheaters = await service.getMovieTheaters();
        expect(movieTheaters.length).toBe(2);
    });

    it('getMovieTheaters 正常 movieTheaters.length > 0', async () => {
        const jsonpStub: any = {};
        const service = new PurchaseService(jsonpStub);
        const data: any = {};
        service.movieTheaters = [data, data];
        const movieTheaters = await service.getMovieTheaters();
        expect(movieTheaters.length).toBe(2);
    });
});
