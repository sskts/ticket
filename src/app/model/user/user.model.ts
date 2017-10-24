/**
 * UserModel
 */
import * as sasaki from '@motionpicture/sskts-api-javascript-client';

export class UserModel {
    private updateAt: string | undefined;
    public contacts: sasaki.factory.person.IContact;
    public creditCards: sasaki.factory.paymentMethod.paymentCard.creditCard.ICheckedCard[];
    public select: {
        purchase: { date: string; theater: string; } | undefined;
    } | undefined;

     constructor(args?: any) {
        if (args === undefined) {
            args = {};
        }
        this.updateAt = (args.updateAt === undefined) ? undefined : args.updateAt;
        this.select = (args.select === undefined) ? { purchase: { date: '', theater: '' } } : args.select;
    }

    public convertToRecord() {
        return {
            select: (this.select === undefined) ? undefined : this.select
        };
    }

    public isFirst() {
        return (this.updateAt === undefined);
    }
}
