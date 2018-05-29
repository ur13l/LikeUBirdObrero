import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const httpModule = require("http");

@Injectable()
export class PaymentService {

    constructor(
    ) {
        
    }

    public addPaymentMethod(method : any) {
        let user = JSON.parse(localStorage.getItem('currentUser'));
        method.last_four = method.cc_number.substr(12, 4);
        console.log(method.cc_number.substr(0,1));
        if(method.cc_number.substr(0,1) == "5") {
            method.icon = "~/assets/img/mastercard.png";
        }
        else {
            method.icon = "~/assets/img/visa.png";
        }
        user.payment_methods.push(method);
        localStorage.setItem('currentUser', JSON.stringify(user));    
                
    }

    public setDefaultMethod(method : any) {
        let user = JSON.parse(localStorage.getItem('currentUser'));
        user.payment_methods.forEach(m => {
            m.checked = false;
            if(m.cc_number == method.cc_number) {
                m.checked = true;
            }
        });   
        localStorage.setItem('currentUser', JSON.stringify(user)); 
        return user.payment_methods;     
    }

    public getDefaultPayment() {
        let user = JSON.parse(localStorage.getItem('currentUser'));
        let method;
        user.payment_methods.forEach(m => {
            if(m.checked) {
               method = m;
            }
        });   
        return method;
    }

}
