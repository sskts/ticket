/**
 * TicketComponent
 */
import { Component, OnInit } from '@angular/core';
import { factory } from '@cinerino/sdk';
import { BsModalService } from 'ngx-bootstrap/modal';
import { cms } from '../../../../models';
import { CmsService, IPurchaseConditions, MasterService, SelectService, UtilService } from '../../../../services';
import { MovieDetailModalComponent } from '../../../shared/components/parts/movie-detail-modal/movie-detail-modal.component';


@Component({
    selector: 'app-movie',
    templateUrl: './movie-index.component.html',
    styleUrls: ['./movie-index.component.scss']
})
/**
 * 作品情報
 * @class MovieIndexComponent
 * @implements OnInit
 */
export class MovieIndexComponent implements OnInit {
    public isLoading: boolean;
    public theaters: factory.chevre.seller.ISeller[];
    public conditions: IPurchaseConditions;
    public nowShowing: { title: cms.schedule.ITitle, schedule: cms.schedule.ISchedule[] }[];
    public comingSoon: { title: cms.schedule.ITitle, schedule: cms.schedule.ISchedule[] }[];

    constructor(
        private cmsService: CmsService,
        private masterService: MasterService,
        private selectService: SelectService,
        private utilService: UtilService,
        private modal: BsModalService,
    ) { }

    /**
     * 初期化
     * @method ngOnInit
     */
    public async ngOnInit() {
        this.isLoading = true;
        try {
            this.conditions = this.selectService.data.purchase;
            this.theaters = await this.masterService.searchSeller(
                { typeOfs: [factory.organizationType.MovieTheater] },
                { exclude: true, sort: true }
            );
            await this.getSchedule();
        } catch (error) {
            this.utilService.openAlert({
                title: 'エラー',
                body: `上映情報が取得に失敗しました。`
            });
            console.error(error);
        }
        this.isLoading = false;
    }

    private async getSchedule() {
        this.nowShowing = [];
        this.comingSoon = [];
        if (this.conditions.theater === '') {
            return;
        }
        const theaterCode = this.conditions.theater;
        this.nowShowing = this.schedule2Title({
            schedule: (await this.cmsService.getSchedule({
                scheduleType: 'nowShowing',
                theaterCode
            })).schedules
        });
        this.comingSoon = this.schedule2Title({
            schedule: (await this.cmsService.getSchedule({
                scheduleType: 'comingSoon',
                theaterCode
            })).schedules
        });
    }

    /**
     * 上映情報を作品別に変換
     */
    private schedule2Title(params: {
        schedule: cms.schedule.ISchedule[]
    }) {
        const result: { title: cms.schedule.ITitle, schedule: cms.schedule.ISchedule[] }[] = [];
        const schedule = params.schedule;
        schedule.forEach(s => {
            const findTitle = result.find(r => r.title.id === s.title.id);
            if (findTitle === undefined) {
                result.push({ title: s.title, schedule: [s] });
                return;
            }
            findTitle.schedule.push(s);
        });
        return result;
    }

    /**
     * 劇場変更
     */
    public async changeTheater() {
        this.selectService.data.purchase.theater = this.conditions.theater;
        this.selectService.save();
        this.isLoading = true;
        try {
            await this.getSchedule();
        } catch (error) {
            this.utilService.openAlert({
                title: 'エラー',
                body: `上映情報が取得に失敗しました。`
            });
            console.error(error);
        }
        this.isLoading = false;
    }

    /**
     * 更新
     */
    public async update() {
        this.isLoading = true;
        try {
            await this.getSchedule();
        } catch (error) {
            this.utilService.openAlert({
                title: 'エラー',
                body: `上映情報が取得に失敗しました。`
            });
            console.error(error);
        }
        this.isLoading = false;
    }

    public openDetail(params: {
        data: { title: cms.schedule.ITitle, schedule: cms.schedule.ISchedule[] },
        routerLink: boolean
    }) {
        this.modal.show(MovieDetailModalComponent, {
            class: 'modal-dialog-centered',
            initialState: {
               data: params.data,
               routerLink: params.routerLink
            }
        });
    }

}
