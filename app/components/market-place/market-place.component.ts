import { Component, OnInit } from '@angular/core';
import { Worker } from '~/models/worker';
import { Page } from 'tns-core-modules/ui/page/page';
import { RouterExtensions } from 'nativescript-angular/router';
import { WorkersService } from '~/services/workers.service';
import { Service } from '~/models/service';
import { ServiceService } from '~/services/service.service';
import { Image } from 'ui/image';

import * as http from "http";
import * as imageSource from "tns-core-modules/image-source";
import { MapService } from '~/services/map.service';
import { AuthService } from '~/services/auth.service';
import { OrdersService } from '~/services/orders.service';
import { Order } from '~/models/order';
// Important - must register MapView plugin in order to use in Angular templates
let mapsModule = require("nativescript-google-maps-sdk");

@Component({
	moduleId:module.id,
	selector: 'market-place',
	templateUrl: 'market-place.component.html',
	styleUrls: ['market-place.component.css']
})

export class MarketPlaceComponent implements OnInit {
	public latitude : number = 19.499074;
	public longitude : number = -99.236763;
	public zoom = 15;
	public workers : Worker[] = [];
	public services : Service[] = [];
	public serviceSelected : number = 1;
	public worker : Worker;
	public heightmap : string ="90%";
	public address : string;
	public messaging : boolean;
	public addressChange : boolean = false;
	public user;
	public addressMarker;
	public mv;
	public m : string;
	public messages : string[] = []

	constructor(
		private _page : Page,
		private _router : RouterExtensions,
		private workersService : WorkersService,
		private servicesService : ServiceService,
		private authService : AuthService,
		private mapService : MapService,
		private ordersService : OrdersService
	) {
		this._page.actionBarHidden = true;
		this.workersService.index()
			.subscribe(
				workers => this.workers = workers
			);
		this.servicesService.index()
			.subscribe(
				services => this.services = services
			)
		this.user = this.authService.getUser();
		
	 }

	ngOnInit() { }

	onMapReady(event) {
		this.mv = event.object;
		this.prepareMarkers();
	}

	prepareMarkers() {
		this.addressMarker = new mapsModule.Marker();
		this.addressMarker.position = mapsModule.Position.positionFromLatLng(this.latitude, this.longitude);
		let icon = new Image();
		icon.src = "~/assets/img/marker.png";
		icon.imageSource = imageSource.fromFile("~/assets/img/marker.png");
		icon.height = 60;
		icon.width = 60;
		
		this.addressMarker.icon = icon;
		
		this.mv.addMarker(this.addressMarker);
		this.mapService.getAddress(this.latitude, this.longitude)
			.then((results : any) => {
			results = JSON.parse(results);
			let r = results.results[0].address_components;
			let t = r[1].long_name + " " + r[0].long_name + ", " + r[2].long_name + ", " + r[3].long_name;
			this.address = t;
			});
		this.workers.forEach(w => {
			let marker = new mapsModule.Marker();
			marker.position = mapsModule.Position.positionFromLatLng(w.latitude, w.longitude);
			marker.title = w.name;
			marker.userData = w;
			let icon = new Image();
			icon.src = w.icon;
			icon.imageSource = imageSource.fromFile(w.icon);
			icon.height = 60;
			icon.width = 60;
			
			marker.icon = icon;
			this.mv.addMarker(marker);
			
		});	
	}
	onMarkerSelect(event) {
		let marker = event.marker;
		this.worker = marker.userData;
		this.heightmap = "75%";
	}


	select(n : number) {
		this.serviceSelected = n;
	}

	back() {
		this._router.back();
	}

	onCameraChanged(event) {
		if(this.addressChange) {
			this.latitude = event.camera.latitude;
			this.longitude = event.camera.longitude;
			this.mapService.getAddress(event.camera.latitude, event.camera.longitude)
			.then((results : any) => {
			results = JSON.parse(results);
			let r = results.results[0].address_components;
			let t = r[1].long_name + " " + r[0].long_name + ", " + r[2].long_name + ", " + r[3].long_name;
			this.address = t;
		});
		}
		
	}


	startMessaging() {
		this.messaging = true;
	}

	stopMessaging() {
		this.messaging = false;
	}

	editAddress(){
		this.addressChange = true;
		this.mv.clear();
	}

	cancelEditAddress() {
		this.addressChange = false;
		this.prepareMarkers();
	}

	makeOrder() {
		let order = new Order( {
			id: Math.floor(Math.random() * 1000) + 1  ,
			name: "",
			success: true,
			price: 0,
			time: 30,
			worker: this.worker,
			latitude: this.latitude,
			longitude : this.longitude
		})
		this.ordersService.makeOrder(order)
			.subscribe(
				order => this._router.navigate(['/confirm-order'])
			)
	}

	send() {
		this.messages.push(this.m);
		this.m = "";
	}
}