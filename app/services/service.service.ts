import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '~/models/response';
import * as fs from 'file-system';
import { JsonService } from '~/services/json.service';
import { Service } from '~/models/service';
require( "nativescript-localstorage" );


@Injectable()
export class ServiceService {
    public documents;

    constructor(
        private jsonService : JsonService
    ) {
        this.documents = fs.knownFolders.currentApp();
    }
    /**
     * Services index
     */
    index() : Observable<Service[]> {
        let serv = localStorage.getItem('listServices');
        if(serv) {
            return new Observable(observer => {
                let s = JSON.parse(serv);
               observer.next(s);          
                
            })
        }

        return new Observable(observer => {
            this.jsonService.readJSON('mock/services.resource.json')
                .then(services => {
                    localStorage.setItem('listServices', JSON.stringify(services.data));
                    observer.next(services.data)
            });          
            
        })
    }
    
    selectService(service : Service) {
        return new Promise(resolve => {
            localStorage.setItem('currentService', JSON.stringify(service));            
            resolve(true);
        })
    }

    getService() {
        return JSON.parse(localStorage.getItem('currentService'))
    }

    confirmService(serv : Service) {
        let services = JSON.parse(localStorage.getItem('listServices'));
        services.forEach(service => {
            if(service.id == serv.id) {
                service.confirmed = true;
            }
        });
        localStorage.setItem('listServices', JSON.stringify(services));
    }

}
