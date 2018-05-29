import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { AuthService } from '~/services/auth.service';
import { Service } from '~/models/service';
import { ServiceService } from '~/services/service.service';
import { WorkersService } from '~/services/workers.service';
import { Worker } from '~/models/worker';

@Component({
    moduleId: module.id,
	selector: 'service-detail',
	templateUrl: 'service-detail.component.html',
	styleUrls: ['service-detail.component.css']
})

export class ServiceDetailComponent implements OnInit {
	public service : Service;
	public workers : Worker[] = [];
	public filter : string;

	constructor(
		private _page : Page,
		private serviceService : ServiceService,
		private workersService : WorkersService
	) { 
		this._page.actionBarHidden = true;
		this.service = serviceService.getService();
		workersService.index()
			.subscribe(
				workers => {
					this.workers = workers
				},
				error => {
				}
			)	
	}

    ngOnInit() {
       this._page.actionBarHidden = true;
	}


	setFilter(text : string) {
		this.filter = text;
	}
	
}