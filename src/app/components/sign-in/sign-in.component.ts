/**
 * SignInComponent
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor() { }

  public async ngOnInit() {
    if (window.opener !== null) {
      console.log('posting message to opner window...', window.location.hash.slice(0, 30), '...');
      window.opener.postMessage(window.location.hash, '*');
    } else {
      console.log('posting message to parent window...', window.location.hash.slice(0, 30), '...');
      window.parent.postMessage(window.location.hash, '*');
    }
  }

}
