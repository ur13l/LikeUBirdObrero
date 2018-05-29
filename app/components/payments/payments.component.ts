import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { RouterExtensions } from 'nativescript-angular/router';
import { TitleService } from '~/services/title.service';

@Component({
	moduleId: module.id,
	selector: 'payments',
	templateUrl: './payments.component.html',
	styleUrls: ['./payments.component.css']
})

export class PaymentsComponent implements OnInit {

	constructor(
		private _page : Page,
		private _router : RouterExtensions,
		private titleService : TitleService
	) { 
		this._page.actionBarHidden = true;
		this.titleService.setImage("~/assets/img/plomeria.png");
		this.titleService.setTitle("Mis pagos");
	}

	ngOnInit() {

	}
}