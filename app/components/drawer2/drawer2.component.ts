import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Page } from "ui/page";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { AuthService } from "~/services/auth.service";
import { RouterExtensions } from "nativescript-angular/router";
import { ServiceService } from "~/services/service.service";
import { Service } from "~/models/service";

@Component({
    moduleId: module.id,
    selector: "drawer2",
    templateUrl: 'drawer2.component.html',
    styleUrls: ['drawer2.component.css']
})
export class Drawer2Component implements AfterViewInit, OnInit {
	private _mainContentText: string;
    public user;
    public service : Service; 

    constructor(
		private _changeDetectionRef: ChangeDetectorRef,
		private _page : Page,
        private authService : AuthService,
        private serviceService : ServiceService,
		private _router : RouterExtensions
	) {
		this._page.actionBarHidden = true
        this.user = this.authService.getUser();
        this.service = this.serviceService.getService();
    }

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    ngOnInit() {
        this.mainContentText = "SideDrawer for NativeScript can be easily setup in the HTML definition of your page by defining tkDrawerContent and tkMainContent. The component has a default transition and position and also exposes notifications related to changes in its state. Swipe from left to open side drawer.";
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