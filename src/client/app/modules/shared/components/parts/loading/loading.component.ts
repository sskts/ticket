import {
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit, OnDestroy {
    @Input() public show: boolean;
    @ViewChild('cover', { static: false }) public cover: ElementRef;
    private AnimationFrameId: number;
    public position: {
        x: number;
        y: number;
    };

    constructor() {}

    /**
     * 初期化
     * @method ngOnInit
     */
    public ngOnInit() {
        this.position = { x: 0, y: 0 };
        const animation = () => {
            if (this.cover !== undefined) {
                const element: HTMLElement = this.cover.nativeElement;
                const contents = element.closest('#contents');
                if (contents !== null) {
                    this.position.y = contents.scrollTop;
                }
            }
            requestAnimationFrame(animation);
        };
        animation();
    }

    public ngOnDestroy() {
        if (this.AnimationFrameId === undefined) {
            return;
        }
        cancelAnimationFrame(this.AnimationFrameId);
    }
}
