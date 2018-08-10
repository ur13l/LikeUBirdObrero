import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { AuthService } from '~/services/auth.service';
import { Router } from '@angular/router';

@Component({
	moduleId: module.id,
	selector: 'welcome-worker',
	templateUrl: './welcome-worker.component.html',
	styleUrls: ['./welcome-worker.component.css']
})

export class WelcomeWorkerComponent implements OnInit {
	public imagen : string = "~/assets/img/plomeria.jpg";
	constructor(
		private _page: Page,
		private authService : AuthService,
        private router : Router
	) { 
        this._page.actionBarHidden = true;
		
	}
	ngOnInit() { 
		this.imagen = localStorage.getItem('imagen');		
	}
}