import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { RouterExtensions } from 'nativescript-angular/router';
import { OrdersService } from '~/services/orders.service';
import { Order } from '~/models/order';

@Component({
    moduleId: module.id,
	selector: 'confirm-order',
	templateUrl: 'confirm-order.component.html',
	styleUrls: ['confirm-order.component.css']
})

export class ConfirmOrderComponent implements OnInit {

	public order : Order;
	public skills : Array<string> = [];
	public dates : string[] = [];
	public selectedDate : number = 0;
	public selectedService : number = 0;
	public rapidService : boolean = false;

	constructor(
		private _page : Page,
		private _router : RouterExtensions,
		private ordersService : OrdersService
	) { 
		this._page.actionBarHidden = true;
		this.order = this.ordersService.getOrder();
		this.order.worker.skills.forEach(
			skill => {
				this.skills.push(skill.name)
			}
		)
		this.nextDates();
		
	}

	ngOnInit() { 
		this.order.date = this.dates[this.selectedDate];
		this.order.price = this.order.worker.skills[0].price;
		this.order.name = this.skills[this.selectedService];
	}

	nextDates() {
		let today = new Date();
		this.dates.push(this.format(today));
		for(let i = 1 ; i < 8 ; i++) {
			this.dates.push(this.format(this.addDays(today, i)));
		}

	}

	addDays = function(date, days) {
		var dat = new Date(date.valueOf());
		dat.setDate(dat.getDate() + days);
		return dat;
	}

	format(date: Date) : string {
		return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
	}


	back() {
		this._router.back();
	}

	home() {
		this._router.navigate(['/home']);
	}

	confirmOrder() {
		this.ordersService.addOrder(this.order)
			.subscribe(
				order => {
					this.ordersService.setSelectedOrder(this.order)
						.subscribe(
							order => {
								this._router.navigate(['/order-detail'])			
							}
						)
				},
				error => {
				}
			)
	}

	onchangeDate(event) {
		this.selectedDate = event.newIndex;		
		this.order.date = this.dates[this.selectedDate];
	}

	onchangeService(event) {
		this.selectedService = event.newIndex;
		this.order.name = this.order.worker.skills[this.selectedService].name;
		this.order.price = this.order.worker.skills[this.selectedService].price;
	}

	openOrder(order : Order) {
		this.ordersService.setSelectedOrder(order)
			.subscribe(
				order => {
					this._router.navigate(['/order'])
				}
			)
	}
}