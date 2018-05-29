import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { WorkersService } from '~/services/workers.service';
import { OrdersService } from '~/services/orders.service';
import { RouterExtensions } from 'nativescript-angular/router';
import { Worker } from '~/models/worker';
import { Order } from '~/models/order';
import { AuthService } from '~/services/auth.service';

@Component({
    moduleId: module.id,
	selector: 'worker-detail',
	templateUrl: 'worker-detail.component.html',
	styleUrls: ['worker-detail.component.css']
})

export class WorkerDetailComponent implements OnInit {
	public worker : Worker;
	public user;

	constructor(
		private _page : Page,
		private _router : RouterExtensions,
		private workersService : WorkersService,
		private ordersService : OrdersService,
		private authService : AuthService
	) { 
		this._page.actionBarHidden = true;
		this.worker = this.workersService.getWorker();
		this.user = this.authService.getUser();
	}

	ngOnInit() { }

	floor(n : number) {
		return Math.floor(n);
	}

	makeOrder() {
		let order = new Order( {
			id: Math.floor(Math.random() * 1000) + 1  ,
			name: "",
			success: true,
			price: 0,
			time: 30,
			worker: this.worker,
			latitude: this.user.latitude,
			longitude : this.user.longitude
		})
		this.ordersService.makeOrder(order)
			.subscribe(
				order => this._router.navigate(['/confirm-order'])
			)
	}
}