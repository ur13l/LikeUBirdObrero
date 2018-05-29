import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Page } from "ui/page";
import { ActionItem } from "ui/action-bar";
import { Observable } from "data/observable";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer, SideDrawerLocation } from 'nativescript-ui-sidedrawer';
import { AuthService } from "~/services/auth.service";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    moduleId: module.id,
    selector: "drawer",
    templateUrl: 'drawer.component.html',
    styleUrls: ['drawer.component.css']
})
export class DrawerComponent implements OnInit {
	private _mainContentText: string;
	public user;
	public currentLocation;

    constructor(
		private _changeDetectionRef: ChangeDetectorRef,
		private _page : Page,
		private authService : AuthService,
		private _router : RouterExtensions
	) {
		this._page.actionBarHidden = true
		this.user = this.authService.getUser();
		this.currentLocation = SideDrawerLocation.Right;
    }

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;


    ngOnInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
        //this.openDrawer();
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