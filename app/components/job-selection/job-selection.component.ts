import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { RouterExtensions } from 'nativescript-angular/router';
import { OrdersService } from '~/services/orders.service';
import { TitleService } from '~/services/title.service';

@Component({
	moduleId: module.id,
	selector: 'job-selection',
	templateUrl: './job-selection.component.html',
	styleUrls: ['./job-selection.component.css']
})

export class JobSelectionComponent implements OnInit {
	public jobs : any [] = [
		{
			id: '1',
			name: "Plomería",
			image: "~/assets/img/faucet.png"
		},
		{
			id: '2',
			name: "Limpieza",
			image: "~/assets/img/spray.png"
		},
		{
			id: '3',
			name: "Grúa",
			image: "~/assets/img/crane.png"
		},
		{
			id: '4',
			name: "Cerrajería",
			image: "~/assets/img/key.png"
		},
		{
			id: '5',
			name: "Reparación de PC",
			image: "~/assets/img/pc.png"
		},
		{
			id: '6',
			name: "Home Appliances",
			image: "~/assets/img/washing-machine.png"
		}
	]
	constructor(
		private _page : Page,
		private _router : RouterExtensions,
		private titleService : TitleService
	) { 
		this._page.actionBarHidden = true;
		this.titleService.setTitle('Selecciona tu rubro');
		this.titleService.setImage('~/assets/img/plomeria.png');
	}

	ngOnInit() { 

	}

}