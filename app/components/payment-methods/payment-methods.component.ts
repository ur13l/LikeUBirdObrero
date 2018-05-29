import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { AuthService } from '~/services/auth.service';
import { TitleService } from '~/services/title.service';
import { RouterExtensions } from 'nativescript-angular/router';
import { PaymentService } from '~/services/payment.service';

@Component({
	moduleId: module.id,
	selector: 'payment-methods',
	templateUrl: './payment-methods.component.html',
	styleUrls: ['./payment-methods.component.css']
})

export class PaymentMethodsComponent implements OnInit {

	public user;
	public paymentMethods = [];
	

	constructor(
		private _page : Page,
		private _router : RouterExtensions,
		private authService : AuthService,
		private paymentService : PaymentService,
		private titleService : TitleService
	) { 
		this._page.actionBarHidden = true;
		this.titleService.setImage("~/assets/img/plomeria.png");
		this.titleService.setTitle("Selecciona el método de pago");
		this.user = this.authService.getUser();
		this.paymentMethods = this.user.payment_methods;
	}

	ngOnInit() { }

	addPaymentMethod() {
		this._router.navigate(['/add-payment-method'])
	}

	setDefaultMethod(method) {
		this.paymentMethods = this.paymentService.setDefaultMethod(method)
			
	}
}