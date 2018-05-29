export class Service {
    constructor (obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.image = obj.image;
        this.time = obj.time;
        this.price = obj.price;
        this.distance = obj.distance;
        this.latitude = obj.latitude;
        this.longitude = obj.longitude;
        this.user_name = obj.user_name;
    }
    public id : number;
    public name : string;
    public image : string;
    public time : number;
    public price : string;
    public distance : string;
    public latitude : string;
    public longitude : string;
    public user_name : string;
}