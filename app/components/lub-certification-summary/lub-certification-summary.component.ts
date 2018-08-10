import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { RouterExtensions } from 'nativescript-angular/router';
import { TitleService } from '~/services/title.service';

@Component({
	moduleId: module.id,
	selector: 'lub-certification-summary',
	templateUrl: './lub-certification-summary.component.html',
	styleUrls: ['./lub-certification-summary.component.css']
})

export class LubCertificationSummaryComponent implements OnInit {
	public imagen : string = "~/assets/img/plomeria.jpg"

	constructor(
		private _page : Page,
		private _router : RouterExtensions,
		private titleService : TitleService
	) { 
		this._page.actionBarHidden = true;
		
	}

	ngOnInit() { 
		this.imagen = localStorage.getItem('imagen');
	}
}