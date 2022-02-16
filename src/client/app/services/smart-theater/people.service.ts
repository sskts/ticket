import { Injectable } from '@angular/core';
import { Base } from './base';

@Injectable({
    providedIn: 'root',
})
export class PeopleService extends Base {
    /**
     * 会員削除
     */
    public async remove() {
        try {
            const url = `${this.endpoint}/projects/${this.projectId}/people/me`;
            await this.http
                .delete<void>(url, {
                    headers: {
                        Authorization: `Bearer ${this.accessToken}`,
                    },
                })
                .toPromise();
        } catch (error) {
            throw error;
        }
    }
}
