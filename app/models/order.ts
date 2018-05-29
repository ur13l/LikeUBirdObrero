import { Skill } from "~/models/skill";
import { Worker } from "~/models/worker";

export class Order {
    constructor (obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.success = obj.success;
        this.price = obj.price;
        this.time = obj.time;
        this.worker = new Worker(obj.worker);
        this.photos = obj.photos; 
        this.latitude = obj.latitude;
        this.longitude = obj.longitude;
    }
    public id : number;
    public name : string;
    public success : boolean;
    public price : number;
    public time : number;
    public worker : Worker;
    public photos : string[];
    public date : string;
    public service : string;
    public latitude : number;
    public longitude : number;
}