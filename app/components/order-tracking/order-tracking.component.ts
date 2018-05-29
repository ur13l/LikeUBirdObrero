import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {registerElement} from "nativescript-angular/element-registry";
import { Page, Color } from 'tns-core-modules/ui/page/page';
import { OrdersService } from '~/services/orders.service';
import { MapService } from '~/services/map.service';
import { AuthService } from '~/services/auth.service';
import * as imageSource from "tns-core-modules/image-source";
import { Order } from '~/models/order';
import { Image } from 'ui/image';
import { RouterExtensions } from 'nativescript-angular/router';

// Important - must register MapView plugin in order to use in Angular templates
let mapsModule = require("nativescript-google-maps-sdk");


@Component({
	moduleId: module.id,
	selector: 'order-tracking',
	templateUrl: 'order-tracking.component.html',
	styleUrls: ['order-tracking.component.css']
})

export class OrderTrackingComponent implements OnInit {
	@ViewChild("MapView") mapView: ElementRef;
	public latitude : number = parseFloat("21.132468");
	public longitude : number = parseFloat("-101.695197");
	public zoom : number = 13;
	public user;
	public order : Order;
	public mv;


    //Map events
    onMapReady = (event) => {
		this.mv = event.object;
		let marker = new mapsModule.Marker();
			marker.position = mapsModule.Position.positionFromLatLng(this.order.worker.latitude, this.order.worker.longitude);
			marker.title = this.order.worker.name;
			marker.userData = this.order.worker;
			let icon = new Image();
			icon.src = this.order.worker.icon;
			icon.imageSource = imageSource.fromFile(this.order.worker.icon);
			icon.height = 60;
			icon.width = 60;
			marker.icon = icon;
			this.mv.addMarker(marker);

		let m2 = new mapsModule.Marker();
		m2.position = mapsModule.Position.positionFromLatLng(this.order.latitude, this.order.longitude);
		let icon2 = new Image();
		icon2.src = "~/assets/img/marker.png";
		icon2.imageSource = imageSource.fromFile("~/assets/img/marker.png");
		icon2.height = 60;
		icon2.width = 60;
		
		m2.icon = icon2;
		
		this.mv.addMarker(m2);
			
		
		// Disabling zoom gestures
		this.latitude = this.order.worker.latitude;
		this.longitude = this.order.worker.longitude;
		this.mv.settings.zoomGesturesEnabled = true;

		this.mapService.getPoints(this.order.worker.latitude, this.order.worker.longitude, this.order.latitude, this.order.longitude)
			.then(
				results => {
					results = JSON.parse(results);
					let pol = new mapsModule.Polyline()
					
					results.routes[0].legs[0].steps.forEach(step => {
						let position = mapsModule.Position.positionFromLatLng(step.start_location.lat, step.start_location.lng);
						pol._points.push(position)
						let p2 = mapsModule.Position.positionFromLatLng(step.end_location.lat, step.end_location.lng);
						pol._points.push(p2)
					});
					let color = new Color(200, 20, 87, 94);
					pol.color = color;
					this.mv.addPolyline(pol);
				}
			)
    };

	constructor(
		private _page : Page,
		private _router : RouterExtensions,
		private orderService : OrdersService,
		private mapService : MapService,
		private authService : AuthService
	) { 
		this.order = this.orderService.getSelectedOrder();
		this.user = this.authService.getUser();
	}

	ngOnInit() { 
		this._page.actionBarHidden = true;
		
	}

	rating() {
		this._router.navigate(['/rating'])
	}
}