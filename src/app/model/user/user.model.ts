/**
 * UserModel
 */

export class UserModel {
    public updateAt: string | undefined;

    constructor (args: any) {
        if (args === undefined) {
            args = {};
        }
        this.updateAt = (args.updateAt === undefined) ? undefined : args.updateAt;
    }

    public convertToRecord() {
        return {
            updateAt : (this.updateAt === undefined) ? undefined : this.updateAt
        };
    }
}
