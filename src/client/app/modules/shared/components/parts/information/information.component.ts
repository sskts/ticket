import { Component, Input, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { SaveType, StorageService } from '../../../../../services';
import { InformationModalComponent } from '../information-modal/information-modal.component';

interface IInformation {
    modal: boolean;
    id: string;
    title?: string;
    description?: string;
    images: string[];
    button?: {
        label: string;
        link: string;
    };
    notWatch: boolean;
}

interface IInformationData {
    id: string;
    title?: string;
    description?: string;
    images: string[];
    button?: {
        label: string;
        link: string;
    };
}

@Component({
    selector: 'app-information',
    templateUrl: './information.component.html',
    styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
    @Input() public isMember: boolean;
    public informations: IInformation[];

    constructor(
        private storage: StorageService,
        private modal: BsModalService,
    ) { }

    public ngOnInit() {
        this.informations = [];
        this.showInformation();
    }

    /**
     * お知らせ表示
     */
    public showInformation() {
        let data: IInformationData[];
        if (this.isMember) {
            data = this.getMemberInformation();
        } else {
            data = this.getInformation();
        }
        const STORAGE_KEY = 'information';
        const informationSession = this.storage.load(STORAGE_KEY, SaveType.Session);
        let informationLocal = this.storage.load(STORAGE_KEY, SaveType.Local);
        if (informationSession !== null && !informationSession.show) {
            return;
        }
        if (informationLocal === null) {
            informationLocal = {
                notWatch: []
            };
        }
        const filter = data.filter((information) => {
            const notWatch = informationLocal.notWatch.find((id: string) => {
                return (id === information.id);
            });
            return (notWatch === undefined);
        });
        this.informations = filter.map((information) => {
            return {
                modal: false,
                id: information.id,
                title: information.title,
                description: information.description,
                images: information.images,
                button: information.button,
                notWatch: false
            };
        });
        if (this.informations.length > 0) {
            this.informations[0].modal = true;
            const information = this.informations[0];
            this.openModal(information, 0);
        }
        this.storage.save(STORAGE_KEY, { show: false }, SaveType.Session);
    }

    /**
     * モーダル表示
     */
    public openModal(information: IInformation, index: number) {
        this.modal.show(InformationModalComponent, {
            class: 'modal-dialog-centered',
            initialState: {
                index: 0,
                id: information.id,
                title: information.title,
                description: information.description,
                images: information.images,
                button: information.button,
                cb: (params: { notWatch: boolean, index: number, id: string }) => {
                    this.informationNotWatch(params);
                    const next = index + 1;
                    const nextInformations = this.informations[next];
                    if (nextInformations !== undefined) {
                        this.openModal(nextInformations, next);
                    }
                }
            }
        });
    }

    /**
     * お知らせモーダル今後非表示
     */
    public informationNotWatch(params: { notWatch: boolean, index: number, id: string }) {
        const STORAGE_KEY = 'information';
        let informationLocal = this.storage.load(STORAGE_KEY, SaveType.Local);
        if (informationLocal === null) {
            informationLocal = {
                notWatch: []
            };
        }
        if (params.notWatch) {
            informationLocal.notWatch.push(params.id);
        } else {
            informationLocal.notWatch = informationLocal.notWatch.filter((id: string) => {
                return params.id !== id;
            });
        }
        this.storage.save(STORAGE_KEY, informationLocal, SaveType.Local);
    }

    /**
     * お知らせモーダル閉じる
     */
    public informationClose(information: IInformation, index: number) {
        information.modal = false;
        if (this.informations[index + 1] !== undefined) {
            this.informations[index + 1].modal = true;
        }
    }

    /**
     * 非会員お知らせ取得
     */
    private getInformation() {
        return [
            {
                id: '2018071700',
                description: 'シネマサンシャインアプリがパワーアップ!<br>会員登録をしてお得に映画鑑賞しよう。',
                images: [],
                button: { label: '会員登録はこちらから', link: '/benefits' }
            }
        ];
    }

    /**
     * 会員お知らせ取得
     */
    private getMemberInformation() {
        return [];
    }
}
