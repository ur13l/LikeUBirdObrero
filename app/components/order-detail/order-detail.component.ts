import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { RouterExtensions } from 'nativescript-angular/router';
import { OrdersService } from '~/services/orders.service';
import { Order } from '~/models/order';

@Component({
    moduleId: module.id,
	selector: 'order-detail',
	templateUrl: './order-detail.component.html',
	styleUrls: ['./order-detail.component.css']
})

export class OrderDetailComponent implements OnInit {
	public order : Order;

	constructor(
		private _page : Page,
		private _router : RouterExtensions,
		private ordersService : OrdersService
	) { 
		this._page.actionBarHidden = true;
		this.order = this.ordersService.getSelectedOrder();
	}

	ngOnInit() { }

	/**
     * 
     */
    myOrders() {
        this._router.navigate(['/my-orders'])
    }
}