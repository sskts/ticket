import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})

export class IndexComponent implements OnInit {
    constructor(private router:Router) {
        console.log(environment);
    }

    public ngOnInit() {
        
    }

    /**
     * Storage初期化
     */
    public initStorage(): void {
        localStorage.removeItem('user');
        this.router.navigateByUrl('');
    }
}
