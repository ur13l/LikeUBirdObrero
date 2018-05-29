import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { AuthService } from '~/services/auth.service';
import { TitleService } from '~/services/title.service';
import { PaymentService } from '~/services/payment.service';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
	moduleId: module.id,
	selector: 'add-payment-method',
	templateUrl: './add-payment-method.component.html',
	styleUrls: ['./add-payment-method.component.css']
})

export class AddPaymentMethodComponent implements OnInit {

	public user;
	public paymentMethod = {};
	public submitted : boolean = false;

	constructor(
		private _page : Page,
		private _router : RouterExtensions,
		private authService : AuthService,
		private titleService : TitleService,
		private paymentService : PaymentService
	) { 
		this._page.actionBarHidden = true;
		this.titleService.setImage("~/assets/img/plomeria.png");
		this.titleService.setTitle("Introduce método de pago");
		this.user = this.authService.getUser();
		
	}

	ngOnInit() { }

	addPayment(){
		this.paymentService.addPaymentMethod(this.paymentMethod);
		this._router.navigate(['/payment-methods']);
	}

	submit () {
		this.submitted = true;
		return true;
	}
}