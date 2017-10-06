/**
 * UserParametersService
 */
import { Injectable } from '@angular/core';
import { CognitoUtil } from '../cognito/cognito.service';

@Injectable()
export class UserParametersService {
    constructor(public cognitoUtil: CognitoUtil) {
    }

    public async getParameters() {
        return new Promise<any>((resolve, reject) => {
            const cognitoUser = this.cognitoUtil.getCurrentUser();

            if (cognitoUser != null) {
                cognitoUser.getSession(async (getSessionErr: any, session: any) => {
                    if (getSessionErr) {
                        console.log('UserParametersService: Couldn\'t retrieve the user');
                        reject(getSessionErr);
                    } else {
                        console.log(session);
                        cognitoUser.getUserAttributes((getUserAttributesErr, result) => {
                            if (getUserAttributesErr) {
                                const message = `UserParametersService: in getParameters ${getUserAttributesErr}`;
                                console.log(message);
                                reject(new Error(message));
                            } else {
                                resolve(result);
                            }
                        });
                    }

                });
            } else {
                resolve(null);
            }
        });
    }
}
