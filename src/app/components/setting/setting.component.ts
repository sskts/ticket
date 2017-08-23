/**
 * 設定変更コンポーネント
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SasakiService } from '../../service/sasaki.service';

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
    private sasakiService: SasakiService,
  ) { }

  public ngOnInit() {
  }

  public async logout() {
    try {
      await this.sasakiService.auth.signOut();
      console.log('logout');
      this.sasakiService.credentials = null;
      this.router.navigate(['/auth/login']);
    } catch (error) {
      console.error(error);
    }
  }

}
