import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '~/models/response';
import * as fs from 'file-system';
import { JsonService } from '~/services/json.service';
import { Service } from '~/models/service';
import { Worker } from '~/models/worker';
require( "nativescript-localstorage" );


@Injectable()
export class TitleService {
    public documents;

    constructor(
        private jsonService : JsonService
    ) {
        this.documents = fs.knownFolders.currentApp();
    }


    setTitle(title : string) {
        localStorage.setItem('currentTitle', title);
    }

    getTitle() {
        return localStorage.getItem('currentTitle');
    }

    setImage(image : string) {
        localStorage.setItem('currentImage', image);
    }

    getImage() {
        return localStorage.getItem('currentImage');
    }
}
