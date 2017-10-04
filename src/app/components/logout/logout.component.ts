/**
 * LogoutComponent
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { SasakiService } from '../../service/sasaki/sasaki.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  @Input() public isOpen: boolean;
  @Output() public close: EventEmitter<{}> = new EventEmitter();
  constructor(
    private router: Router,
    private sasaki: SasakiService
  ) { }

  public ngOnInit() {
  }

  public async logout() {
    try {
      await this.sasaki.auth.signOut();
      console.log('logout');
      this.sasaki.credentials = null;
      this.router.navigate(['/auth/login']);
    } catch (error) {
      console.error(error);
    }
  }
}
