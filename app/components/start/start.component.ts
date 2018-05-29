import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
    moduleId: module.id,
	selector: 'start',
	templateUrl: './start.component.html',
	styleUrls: ['./start.component.css']
})

export class StartComponent implements OnInit {

	constructor(private _page: Page) { 
        this._page.actionBarHidden = true;		
	}

    ngOnInit() {
        this._page.actionBarHidden = true;
    }
}