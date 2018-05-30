import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-point-stamps',
    templateUrl: './point-stamps.component.html',
    styleUrls: ['./point-stamps.component.scss']
})
export class PointStampsComponent implements OnInit {
    @Input() public point: number;
    public config: SwiperOptions;
    public stamps: {
        label: number;
        status: boolean;
    }[][];
    constructor() { }

    /**
     * 初期化
     * @method ngOnInit
     */
    public ngOnInit() {
        this.config = {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            autoHeight: true,
            paginationType: 'fraction'
        };

        const stampGroupLimit = 6;
        // グループリスト作成
        this.stamps = [];
        const loop = (this.point === 0) ? 1 : Math.ceil(this.point / stampGroupLimit);
        for (let i = 0; i < loop; i++) {
            // グループ作成
            const stampGroup = [];
            for (let j = 0; j < stampGroupLimit; j++) {
                stampGroup.push({
                    label: (j % 6) + 1,
                    status: false
                });
            }
            this.stamps.push(stampGroup);
        }
        // ステータス反映
        this.stamps.forEach((group, groupIndex) => {
            group.forEach((stamp, index) => {
                stamp.status = (groupIndex * stampGroupLimit) + index < this.point;
            });
        });

    }

}
