import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { RouterExtensions } from 'nativescript-angular/router';
import { Order } from '~/models/order';
import { OrdersService } from '~/services/orders.service';
import { AuthService } from '~/services/auth.service';

@Component({
	moduleId: module.id,
	selector: 'order',
	templateUrl: 'order.component.html',
	styleUrls: ['order.component.css']
})

export class OrderComponent implements OnInit {
	public order : Order;
	public user;

	constructor(
		private _page : Page,
		private _router : RouterExtensions,
		private ordersService : OrdersService,
		private authService : AuthService
	) {
		_page.actionBarHidden = true;
		this.order = this.ordersService.getSelectedOrder();
		this.user = this.authService.getUser();
	 }

	ngOnInit() { }

	back() {
		this._router.back();
	}

	home() {
		this._router.navigate(['/home'])
	}

	track(){
		this._router.navigate(['/order-tracking'])
	}

}