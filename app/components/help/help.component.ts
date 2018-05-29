import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { TitleService } from '~/services/title.service';

@Component({
	moduleId: module.id,
	selector: 'help',
	templateUrl: 'help.component.html',
	styleUrls: ['help.component.css']
})

export class HelpComponent implements OnInit {

	constructor(
		private _page : Page,
		private titleService : TitleService
	) { 
		this._page.actionBarHidden = true;
		this.titleService.setImage("~/assets/img/plomeria.png");
		this.titleService.setTitle("Ayuda");
	}

	ngOnInit() { }
}