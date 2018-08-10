import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { RouterExtensions } from 'nativescript-angular/router';
import { TitleService } from '~/services/title.service';

@Component({
	moduleId: module.id,
	selector: 'dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
	
	constructor(
		private _page : Page,
		private _router : RouterExtensions,
		private titleService : TitleService
	) { 
		this._page.actionBarHidden = true;
		
	}

	ngOnInit() { 
	}
}