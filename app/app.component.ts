import { Component } from "@angular/core";
import { Page } from "ui/page";
import { registerElement } from "nativescript-angular/element-registry";

// Important - must register MapView plugin in order to use in Angular templates
registerElement("MapView", () => require("nativescript-google-maps-sdk").MapView);
let mapsModule = require("nativescript-google-maps-sdk");
registerElement('StarRating', () => require('nativescript-star-ratings').StarRating);

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
	styleUrls: ['app.component.css']
})



export class AppComponent { 
constructor(private _page: Page) { }

    ngOnInit() {
        this._page.actionBarHidden = true;
    }

}


