import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Page } from "ui/page";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer, SideDrawerLocation } from 'nativescript-ui-sidedrawer';
import { AuthService } from "~/services/auth.service";
import { RouterExtensions } from "nativescript-angular/router";
import { ServiceService } from "~/services/service.service";
import { Service } from "~/models/service";
import { TitleService } from "~/services/title.service";
import { Router } from "@angular/router";

@Component({
    moduleId: module.id,
    selector: "drawer3",
    templateUrl: 'drawer3.component.html',
    styleUrls: ['drawer3.component.css']
})
export class Drawer3Component implements AfterViewInit, OnInit {
	private _mainContentText: string;
    public user;
    public title : string;
    public image : string;
    public currentLocation;

    constructor(
		private _changeDetectionRef: ChangeDetectorRef,
		private _page : Page,
        private authService : AuthService,
        private serviceService : ServiceService,
        private titleService : TitleService,
		private _router : RouterExtensions
	) {
        this._page.actionBarHidden = true
        this.user = this.authService.getUser()
        
		this.currentLocation = SideDrawerLocation.Right;
        this._router.router.events.subscribe(
            val => {
                this.title = this.titleService.getTitle();
                this.image = this.titleService.getImage();
            }
        )

    }

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();

    }

    ngOnInit() {
        
    }

    get mainContentText() {
        return this._mainContentText;
    }

    set mainContentText(value: string) {
        this._mainContentText = value;
    }

    public openDrawer() {
        this.drawer.showDrawer();
    }

    navigate(route) {
        this._router.navigate([route]);
    }

    changeTitle(title : string) {
        this.title = title;
    }

	logout() {
		this.drawer.closeDrawer();
		this.authService.logout()
			.then(
				succes => {
					this._router.navigate(['/'], { clearHistory: true })
				},
				error => {
				}
			)
	}
}