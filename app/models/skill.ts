export class Skill {
    constructor (obj) {
        this.name = obj.name;
        this.icon = obj.icon;
        this.price = obj.price;
    }
    public name : string;
    public icon : string;
    public price : number;
}