import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '~/models/response';
import * as fs from 'file-system';
import { JsonService } from '~/services/json.service';
import { Service } from '~/models/service';
import { Worker } from '~/models/worker';
require( "nativescript-localstorage" );


@Injectable()
export class WorkersService {
    public documents;

    constructor(
        private jsonService : JsonService
    ) {
        this.documents = fs.knownFolders.currentApp();
    }
    /**
     * Services index
     */
    index() : Observable<Worker[]> {
        return new Observable(observer => {
            this.jsonService.readJSON('mock/workers.resource.json')
                .then(workers => {
                    observer.next(workers.data);
                });          
            
        })
    }
    
    selectWorker(worker : Worker) {
        return new Promise(resolve => {
            localStorage.setItem('currentWorker', JSON.stringify(worker));            
            resolve(true);
        })
    }

    getWorker() {
        return JSON.parse(localStorage.getItem('currentWorker'))
    }

}
