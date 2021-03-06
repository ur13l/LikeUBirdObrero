import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { RouterExtensions } from 'nativescript-angular/router';
import { TitleService } from '~/services/title.service';

@Component({
	moduleId: module.id,
	selector: 'history',
	templateUrl: './history.component.html',
	styleUrls: ['./history.component.css']
})

export class HistoryComponent implements OnInit {

	constructor(
		private _page : Page,
		private _router : RouterExtensions,
		private titleService : TitleService
	) { 
		this._page.actionBarHidden = true;
		this.titleService.setImage("~/assets/img/plomeria.png");
		this.titleService.setTitle("Historial");
	}
	

	ngOnInit() { }
}