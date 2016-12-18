import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: 'app/components/index/index.component.html',
  styleUrls: ['app/components/index/index.component.scss']
})

export class IndexComponent implements OnInit {
    constructor(private router:Router) {
        // console.log(environment);
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
