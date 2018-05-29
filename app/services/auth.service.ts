import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '~/models/response';
import * as fs from 'file-system';
import { JsonService } from '~/services/json.service';
require( "nativescript-localstorage" );


@Injectable()
export class AuthService {
    public documents;

    constructor(
        private jsonService : JsonService
    ) {
        this.documents = fs.knownFolders.currentApp();
    }
    /**
     * Login user
     * @param email 
     * @param password 
     */
    login(email : string, password : string) : Observable<any> {
        return new Observable(observer => {
            this.jsonService.readJSON('mock/user.resource.json')
                .then(user => {
                    localStorage.setItem('currentUser', JSON.stringify(user.data));
                    observer.next(user);
                });          
            
        })
    }
    
    /**
     * Login user
     * @param email 
     * @param password 
     */
    register(email : string, name : string, password: string, confirmPassword : string) : Observable<any> {
        return new Observable(observer => {
            this.jsonService.readJSON('mock/user.resource.json')
                .then(user => {
                    localStorage.setItem('currentUser', JSON.stringify(user.data));
                    observer.next(user);
                });          
            
        })
    }
    

    /** Get current user */
    getUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    /** 
     * Log out
    */
    logout() {
        return new Promise(resolve => {
            localStorage.removeItem('currentUser');            
            resolve(true);
        })
    }

}
