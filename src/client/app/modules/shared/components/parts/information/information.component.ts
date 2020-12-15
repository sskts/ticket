import { Component, Input, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { IInformationData, InformationService, SaveType, StorageService } from '../../../../../services';
import { InformationModalComponent } from '../information-modal/information-modal.component';

interface IInformation extends IInformationData {
    modal: boolean;
    notWatch: boolean;
}

@Component({
    selector: 'app-information',
    templateUrl: './information.component.html',
    styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
    @Input() public url: string;
    public data: IInformationData[] = [];

    public informations: IInformation[];

    constructor(
        private storage: StorageService,
        private modal: BsModalService,
        private informationService: InformationService
    ) { }

    public async ngOnInit() {
        this.informations = [];
        this.data = [];
        try {
            this.data = await this.informationService.getAvailabilityData(this.url);
            await this.showInformation();
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * お知らせ表示
     */
    public async showInformation() {
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
        const filterResult = this.data.filter(d => {
            const notWatch = informationLocal.notWatch.find((id: string) => {
                return (id === d.id);
            });
            return (notWatch === undefined);
        });
        this.informations = filterResult.map(d => {
            return {
                ...d,
                modal: false,
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
                image: information.image,
                url: information.url,
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

}
