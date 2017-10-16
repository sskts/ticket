/**
 * LogoutComponent
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

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
  ) { }

  public ngOnInit() {
  }

  public async logout() {
    try {
      this.router.navigate(['/']);
    } catch (error) {
      console.error(error);
    }
  }
}
