import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { RouterExtensions } from 'nativescript-angular/router';
import { OrdersService } from '~/services/orders.service';
import { Order } from '~/models/order';
import { PaymentService } from '~/services/payment.service';

@Component({
	moduleId: module.id,
	selector: 'rating',
	templateUrl: './rating.component.html',
	styleUrls: ['./rating.component.css']
})

export class RatingComponent implements OnInit {
	public order : Order;
	public paymentMethod;

	constructor(
		private _page : Page,
		private _router : RouterExtensions,
		private ordersService : OrdersService,
		private paymentService : PaymentService
	) { 
		this._page.actionBarHidden = true;
		this.order = this.ordersService.getSelectedOrder();
		this.paymentMethod = this.paymentService.getDefaultPayment();
	}

	ngOnInit() { }


	home() {
		this._router.navigate(['/market-place']);
	}
}