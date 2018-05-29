import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { SnackBar } from 'nativescript-snackbar';
import { AuthService } from '~/services/auth.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
	selector: 'sign-up',
	templateUrl: 'sign-up.component.html',
	styleUrls: ['sign-up.component.css']
})

export class SignUpComponent implements OnInit {
	public email : string;
	public name : string;
	public password : string;
	public confirmPassword : string;
	public privacyPolicy : boolean = false;

	public submitted : boolean = false;
	
	// Create an instance of SnackBar
	public snackbar : SnackBar = new SnackBar();

	constructor(
		private _page: Page,
		private authService : AuthService,
        private router : Router
	) { 
        this._page.actionBarHidden = true;
		
	}

    ngOnInit() {
        this._page.actionBarHidden = true;
	}
	

	/**
	 * Register method
	 */
	register() {
		this.authService.register(this.email, this.name, this.password, this.confirmPassword)
			.subscribe(
				res => {
					this.snackbar.simple("Bienvenido " + res.data.name, 'black', '#fff').then((args) => {
						this.router.navigate(['/home'])
				  });
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