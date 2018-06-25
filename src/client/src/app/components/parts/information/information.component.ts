import { Component, OnInit } from '@angular/core';
import { SaveType, StorageService } from '../../../services/storage/storage.service';

interface Iinformation {
    modal: boolean;
    id: string;
    title: string;
    description: string;
    images: string[];
    button?: {
        label: string;
        link: string;
    };
    notWatch: boolean;
}

@Component({
    selector: 'app-information',
    templateUrl: './information.component.html',
    styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
    public informations: Iinformation[];

    constructor(
        private storage: StorageService
    ) { }

    public ngOnInit() {
        this.informations = [];
        this.showInformation();
    }

    /**
     * お知らせ表示
     */
    public showInformation() {
        // tslint:disable:max-line-length
        const data: {
            id: string;
            title: string;
            description: string;
            images: string[];
            button?: {
                label: string;
                link: string;
            };
        }[] = [
                // {
                //     id: '123',
                //     title: 'お知らせ1',
                //     description: 'テスト文章<br>テスト文章2',
                //     images: ['/assets/images/common/credit_back.svg'],
                //     button: { label: 'テスト', link: '/member/mypage' }
                // },
                // {
                //     id: '234',
                //     title: 'お知らせ2',
                //     description: 'テスト文章2テスト文章2テスト文章2テスト文章2テスト文章2テスト文章2',
                //     images: ['/assets/images/common/credit_back.svg']
                // }
            ];
        const STORAGE_KEY = 'information';
        const informationSession = this.storage.load(STORAGE_KEY, SaveType.Session);
        let informationLocal = this.storage.load(STORAGE_KEY, SaveType.Local);
        if (informationSession !== null && informationSession.show) {
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
        }
        this.storage.save(STORAGE_KEY, { show: true }, SaveType.Session);
    }

    /**
     * お知らせモーダル閉じる
     */
    public informationClose(information: Iinformation, index: number) {
        information.modal = false;
        if (information.notWatch) {
            const STORAGE_KEY = 'information';
            let informationLocal = this.storage.load(STORAGE_KEY, SaveType.Local);
            if (informationLocal === null) {
                informationLocal = {
                    notWatch: []
                };
            }
            informationLocal.notWatch.push(information.id);
            this.storage.save(STORAGE_KEY, informationLocal, SaveType.Local);
        }
        if (this.informations[index + 1] !== undefined) {
            this.informations[index + 1].modal = true;
        }
    }

}
