/**
 * UserModel
 */
import * as sasaki from '@motionpicture/sskts-api-javascript-client';

export class UserModel {
    private updateAt: string | undefined;
    public contacts: sasaki.factory.person.IContact;
    public creditCards: sasaki.factory.paymentMethod.paymentCard.creditCard.ICheckedCard[];

     constructor(args?: any) {
        if (args === undefined) {
            args = {};
        }
        this.updateAt = (args.updateAt === undefined) ? undefined : args.updateAt;
    }

    public convertToRecord() {
        return {};
    }

    public isFirst() {
        return (this.updateAt === undefined);
    }
}
