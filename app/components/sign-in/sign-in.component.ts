import { Component, OnInit } from '@angular/core';
import { AuthService } from '~/services/auth.service';
import { SnackBar, SnackBarOptions } from "nativescript-snackbar";
import { Page } from 'tns-core-modules/ui/page/page';
import { RouterExtensions } from 'nativescript-angular/router';



@Component({
    moduleId: module.id,
	selector: 'sign-in',
	templateUrl: 'sign-in.component.html',
	styleUrls: ['sign-in.component.css']
})

export class SignInComponent implements OnInit {
	public email : string;
	public password : string;
	
	//Form validator
	public submitted : boolean = false;

	// Create an instance of SnackBar
	public snackbar : SnackBar = new SnackBar();


	constructor(
		private _page: Page,
		private authService : AuthService,
		private router: RouterExtensions
	) { 
        this._page.actionBarHidden = true;		
	}

    ngOnInit() {
        this._page.actionBarHidden = true;
	}
	
	/**
	 * Login method
	 */
	login() {
		this.submitted = true;
		
		this.authService.login(this.email, this.password)
			.subscribe(
				res => {
					let options: SnackBarOptions = {
						actionText: null,
						actionTextColor: '#ff4081', // Optional, Android only
						snackText: "Bienvenido " + res.data.name,
						hideDelay: 1000,
						textColor: 'black', // Optional, Android only
						backgroundColor: 'white' // Optional, Android only
					  };
					this.router.navigate(['/home'], { clearHistory: true })					
					//this.snackbar.action(options)
					this.snackbar.simple("Bienvenido " + res.data.name, 'black', '#fff').then((args) => {});
				}
			)
	}


	/**
	 * Change submit Status
	 */
	submit() {
		this.submitted = true;
		return true;
	}

}