import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { RouterExtensions } from 'nativescript-angular/router';
import { OrdersService } from '~/services/orders.service';
import { Order } from '~/models/order';
import { TitleService } from '~/services/title.service';

@Component({
	moduleId: module.id,
	selector: 'my-orders',
	templateUrl: 'my-orders.component.html',
	styleUrls: ['my-orders.component.css']
})

export class MyOrdersComponent implements OnInit {
	public orders : Order[] = [];

	constructor(
		private _page : Page,
		private _router : RouterExtensions,
		private ordersService : OrdersService,
		private titleService : TitleService
	) { 
		this._page.actionBarHidden = true;
		this.orders = this.ordersService.getCurrentOrders();
		this.titleService.setTitle('Mis servicios');
		this.titleService.setImage('~/assets/img/plomeria.png');
	}

	ngOnInit() { 

	}

	openOrder(order : Order) {
		this.ordersService.setSelectedOrder(order)
			.subscribe(
				order => {
					this._router.navigate(['/order']);
				}
			)
	}
}