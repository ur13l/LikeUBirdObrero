import { Component, OnInit } from '@angular/core';
import { Service } from '~/models/service';
import { Page } from 'tns-core-modules/ui/page/page';
import { ServiceService } from '~/services/service.service';
import { WorkersService } from '~/services/workers.service';
import { RouterExtensions } from 'nativescript-angular/router';
import * as imageSource from "tns-core-modules/image-source";
import { Image } from 'ui/image';
import { AuthService } from '~/services/auth.service';
import { SnackBar } from 'nativescript-snackbar';
import {openUrl} from "utils/utils"
let mapsModule = require("nativescript-google-maps-sdk");

@Component({
	moduleId: module.id,
	selector: 'confirm-service',
	templateUrl: './confirm-service.component.html',
	styleUrls: ['./confirm-service.component.css']
})

export class ConfirmServiceComponent implements OnInit {
	public service : Service;
	public workers : Worker[] = [];
	public filter : string;
	public zoom = 14;
	public latitude = 0;
	public longitude = 0; 
	public mv;
	public user;
	public snackbar : SnackBar = new SnackBar();
	


	constructor(
		private _page : Page,
		private _router : RouterExtensions,
		private serviceService : ServiceService,
		private workersService : WorkersService,
		private authService : AuthService
	) { 
		this._page.actionBarHidden = true;
		this.service = serviceService.getService();
		this.latitude = parseFloat(this.service.latitude);
		this.longitude = parseFloat(this.service.longitude);
		this.user = this.authService.getUser();
	}

    ngOnInit() {
       this._page.actionBarHidden = true;
	}


	setFilter(text : string) {
		this.filter = text;
	}

	confirmService() {
		this.snackbar.simple("¡Has confirmado el servicio y el cliente ha sido notificado!", 'black', '#fff').then((args) => {
			//openUrl('waze://?ll='+this.latitude+','+this.longitude+'&z=10');
			this.serviceService.confirmService(this.service);
			this._router.navigate(['/'])
		});
		
	}
	
	onMapReady(event) {
		this.mv = event.object;
		this.mv.settings.mapToolbarEnabled = true;
		let marker = new mapsModule.Marker();
			marker.position = mapsModule.Position.positionFromLatLng(this.latitude, this.longitude);
			marker.title = this.service.name;
			marker.userData = this.service;
			let icon = new Image();
			icon.src = this.service.image;
			icon.imageSource = imageSource.fromFile("~/assets/img/marker.png");
			icon.height = 60;
			icon.width = 60;
			marker.icon = icon;
			this.mv.addMarker(marker);
	}
}