import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { AuthService } from '~/services/auth.service'
import { RouterExtensions } from 'nativescript-angular/router';
import { TnsSideDrawer } from 'nativescript-sidedrawer'
import { ServiceService } from '~/services/service.service';
import { Service } from '~/models/service';

@Component({
    moduleId: module.id,
	selector: 'home',
	templateUrl: 'home.component.html',
	styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
	public services : Service[] = [];
	public offline : boolean = false;

	constructor(
		private _page : Page,
		private _router : RouterExtensions,
		private authService : AuthService,
		private serviceService : ServiceService

	) { 
		this._page.actionBarHidden = true;
		this._router.router.events.subscribe(
			s => {
				this.serviceService.index()
			.subscribe(
				services => {
					this.services = services;
					console.log(this.services)
				},
				error => {
				}
			)
			}
		)
		
	}

    ngOnInit() {
		
	}

	logout() {
		this.authService.logout()
			.then(
				succes => {
					this._router.navigate(['/'], { clearHistory: true })
				},
				error => {
				}
			)
	}

	confirmService(service : Service) {
		this.serviceService.selectService(service)
			.then(
				response => this._router.navigate(['/confirm-service'], { clearHistory: false })
			)
	}


	marketPlace() {
		this._router.navigate(['/market-place']);
	}

	toggleOffline() {
		this.offline = !this.offline;
	}
}