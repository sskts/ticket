// /**
//  * AuthComponent
//  */
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { AwsCognitoService } from '../../service/aws-cognito/aws-cognito.service';
// import { SasakiService } from '../../service/sasaki/sasaki.service';

// @Component({
//     selector: 'app-auth',
//     templateUrl: './auth.component.html',
//     styleUrls: ['./auth.component.scss']
// })
// export class AuthComponent implements OnInit {
//     public isLoading: boolean;

//     constructor(
//         private sasaki: SasakiService,
//         private awsCognito: AwsCognitoService,
//         private router: Router
//     ) { }

//     public ngOnInit() {
//         this.isLoading = false;
//     }

//     public async signIn() {
//         try {
//             const result = await this.sasaki.auth.signIn();
//             this.sasaki.credentials = result;
//             this.isLoading = true;
//             this.router.navigate(['/']);
//         } catch (error) {
//             console.error(error);
//             this.isLoading = false;
//         }
//     }

//     public async signInWithTerminal() {
//         try {
//             await this.awsCognito.authenticateWithTerminal();
//         } catch (err) {
//             console.log(err);
//         }
//     }
// }
