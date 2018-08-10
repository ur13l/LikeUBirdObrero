import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { RouterExtensions } from 'nativescript-angular/router';
import { TitleService } from '~/services/title.service';
import * as imagepicker from "nativescript-imagepicker";

@Component({
	moduleId: module.id,
	selector: 'certification-lub-documents',
	templateUrl: './certification-lub-documents.component.html',
	styleUrls: ['./certification-lub-documents.component.css']
})

export class CertificationLubDocumentsComponent implements OnInit {
	public imagen : string = "~/assets/img/plomeria.jpg"
	public jobs : any [] = [
		{
			name: "Título o certificado técnico",
			image: "~/assets/img/title.png"
		},
		{
			name: "Carta de Antecedentes no penales",
			image: "~/assets/img/penal.png"
		},
		{
			name: "Recibo de domicilio",
			image: "~/assets/img/receipt.png"
		},
		{
			name: "Copia de RFC",
			image: "~/assets/img/rfc.png"
		},
		{
			name: "INE",
			image: "~/assets/img/ine.png"
		}
	]
	public dobs : any [] = [
		{
			name: "Calificar con certificado LUB"
		},
		{
			name: "Calificar más competencias"
		}
	]
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


	imageAssets = [];
    imageSrc: any;
    isSingleMode: boolean = true;
    thumbSize: number = 80;
    previewSize: number = 300;

    public onSelectMultipleTap() {
        this.isSingleMode = false;

        let context = imagepicker.create({
            mode: "multiple"
        });
        this.startSelection(context);
    }

    public onSelectSingleTap() {
        this.isSingleMode = true;

        let context = imagepicker.create({
            mode: "single"
        });
        this.startSelection(context);
    }

    private startSelection(context) {
        let that = this;

        context
        .authorize()
        .then(() => {
            that.imageAssets = [];
            that.imageSrc = null;
            return context.present();
        })
        .then((selection) => {
            console.log("Selection done: " + JSON.stringify(selection));
            that.imageSrc = that.isSingleMode && selection.length > 0 ? selection[0] : null;

            // set the images to be loaded from the assets with optimal sizes (optimize memory usage)
            selection.forEach(function (element) {
                element.options.width = that.isSingleMode ? that.previewSize : that.thumbSize;
                element.options.height = that.isSingleMode ? that.previewSize : that.thumbSize;
            });

            that.imageAssets = selection;
        }).catch(function (e) {
            console.log(e);
        });
    }
}