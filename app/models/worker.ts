import { Skill } from "~/models/skill";

export class Worker {
    constructor (obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.km = obj.km;
        this.rating = obj.rating;
        this.description = obj.description;
        this.image = obj.image;
        this.type = obj.type;
        this.latitude = obj.latitude;
        this.longitude = obj.longitude;
        this.icon = obj.icon;

        
        this.skills = [];
        obj.skills.forEach(skill => {
            this.skills.push(new Skill(skill));
        });
    }
    public id : number;
    public name : string;
    public km : number;
    public rating : string;
    public description : string;
    public image : string;
    public type : string;
    public skills : Skill[];
    public latitude : number;
    public longitude : number;
    public icon : string;
}