import { Component, OnInit } from '@angular/core';
import { SnackBar } from 'nativescript-snackbar';
import { Page } from 'tns-core-modules/ui/page/page';
import { AuthService } from '~/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	moduleId: module.id,
	selector: 'certification-lub',
	templateUrl: './certification-lub.component.html',
	styleUrls: ['./certification-lub.component.css']
})

export class CertificationLubComponent implements OnInit {
	public niveles : any[] = [
		"Medio",
		"Alto",
		"Experto"
	]
	public nivelSeleccionado : string = "Medio";
	public email : string;
	public name : string;
	public password : string;
	public confirmPassword : string;
	public privacyPolicy : boolean = false;
	public imagen : string =  "~/assets/img/plomeria.jpg";

	public submitted : boolean = false;
	public type : string;
	
	// Create an instance of SnackBar
	public snackbar : SnackBar = new SnackBar();

	constructor(
		private _page: Page,
		private authService : AuthService,
		private router : Router,
		private route : ActivatedRoute
	) { 
        this._page.actionBarHidden = true;
		this.type = this.route.snapshot.params.type;
		switch(this.type){
			case '1':
				this.imagen = "~/assets/img/plomeria.jpg"
			break;
			case '2':
				this.imagen = "~/assets/img/limpieza.jpg"
			break;
			case '3':
				this.imagen = "~/assets/img/cerrajeria.jpg"
			break;
			case '4':
				this.imagen = "~/assets/img/cerrajeria.jpg"
			break;
			case '5':
				this.imagen = "~/assets/img/cerrajeria.jpg"
			break;
		}
		localStorage.setItem('imagen', this.imagen);
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