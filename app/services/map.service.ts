import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response } from '~/models/response';
import * as fs from 'file-system';

const httpModule = require("http");

@Injectable()
export class MapService {

    constructor(
    ) {
        
    }

    public getAddress(lat, lng) {
           return httpModule.getString("http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&sensor=true&project=AIzaSyAtAvECmuThQGOKF9jkL06wKsuakRtZTcc")
      
        
            
    }

    public getPoints(lat, lng, dLat, dLng) {
        return httpModule.getString("https://maps.googleapis.com/maps/api/directions/json?origin="+dLat+","+dLng+"&destination="+lat+","+lng+"&key=AIzaSyAtAvECmuThQGOKF9jkL06wKsuakRtZTcc")
    }

}
