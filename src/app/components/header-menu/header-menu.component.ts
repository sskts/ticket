/**
 * HeaderMenuComponent
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {
  @Input() public isOpen: boolean;
  @Output() public logout: EventEmitter<{}> = new EventEmitter();
  @Output() public close: EventEmitter<{}> = new EventEmitter();
  public name: string;

  constructor(
    private user: UserService
  ) { }

  public ngOnInit() {
    this.name = `${this.user.contacts.familyName} ${this.user.contacts.givenName}`;
  }
}
