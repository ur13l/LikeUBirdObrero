import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { TitleService } from '~/services/title.service';
import { AuthService } from '~/services/auth.service';
import { registerElement } from 'nativescript-angular/element-registry';
import { RouterExtensions } from 'nativescript-angular/router';
import { PaymentService } from '~/services/payment.service';


// Important - must register MapView plugin in order to use in Angular templates
let mapsModule = require("nativescript-google-maps-sdk");

@Component({
	moduleId: module.id,
	selector: 'settings',
	templateUrl: 'settings.component.html',
	styleUrls: ['settings.component.css']
})

export class SettingsComponent implements OnInit {
	public user;
	public latitude : number = 0;
	public longitude : number = 0;
	public zoom : number = 14;
	public paymentMethod : any;


	constructor(
		private _page : Page,
		private _router : RouterExtensions,
		private authService : AuthService,
		private titleService : TitleService,
		private paymentService : PaymentService
	) { 
		this._page.actionBarHidden = true;
		this.titleService.setImage("~/assets/img/plomeria.png");
		this.titleService.setTitle("Configuración");
		this.user = this.authService.getUser();
		this.latitude = parseFloat(this.user.latitude);
		this.longitude = parseFloat(this.user.longitude);

		this._router.router.events.subscribe(
			h => {
				this.paymentMethod = this.paymentService.getDefaultPayment();
			}
		)
	}

	ngOnInit() { }

	onMapReady(event) {
		let mv = event.object;
		let marker = new mapsModule.Marker();
		marker.position = mapsModule.Position.positionFromLatLng(this.latitude, this.longitude);
		marker.userData = { index : 1};
		mv.addMarker(marker);
		
		// Disabling zoom gestures
		mv.settings.zoomGesturesEnabled = false;
		
	}

	paymentMethods() {
		this._router.navigate(['/payment-methods']);
	}
}