import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '~/models/response';
import * as fs from 'file-system';
import { JsonService } from '~/services/json.service';
import { Service } from '~/models/service';
import { Worker } from '~/models/worker';
import { Order } from '~/models/order';
require( "nativescript-localstorage" );


@Injectable()
export class OrdersService {
    public documents;

    constructor(
        private jsonService : JsonService
    ) {
        this.documents = fs.knownFolders.currentApp();
    }
    
    
    makeOrder(order : Order) {
        return new Observable(observer => {
    
                localStorage.setItem('currentOrder', JSON.stringify(order));            
                observer.next(order);
            })
        }
    

    /** */
    getOrder() : Order{
        return new Order(JSON.parse(localStorage.getItem('currentOrder')))
    }

    getCurrentOrders() {
        let currentOrders = localStorage.getItem('myOrders');
        if(!currentOrders) {
            return [] 
        }
        return JSON.parse(currentOrders);
    }

    addOrder(order : Order) {
        return new Observable(observer => {
            let currentOrders = localStorage.getItem('myOrders');
            let arr = [];
            if(!currentOrders) {
                arr = [];  
            }
            else {
                arr = JSON.parse(currentOrders);

            }
            arr.push(order)
            localStorage.setItem('myOrders', JSON.stringify(arr));
            return observer.next(order);
        });
    }


    setSelectedOrder(order : Order) {
        return new Observable(observer => {
            localStorage.setItem('selectedOrder', JSON.stringify(order));
            observer.next(order);         
        })
    }

    getSelectedOrder() : Order{
        return JSON.parse(localStorage.getItem('selectedOrder'))
    }

}
