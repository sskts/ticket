/**
 * SettingComponent
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SasakiService } from '../../service/sasaki/sasaki.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
/**
 * 設定変更
 * @class SettingComponent
 * @implements OnInit
 */
export class SettingComponent implements OnInit {

  constructor(
    private router: Router,
    private sasaki: SasakiService,
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
