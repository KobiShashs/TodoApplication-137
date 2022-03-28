export class Task{
    public id?:number;
    public title?:string;
    public description?: string;
    public group?: string;
    public when?:Date;
    
    public constructor(id?:number, title?:string, description?: string, group?: string, when?:Date){
        this.id = id;
        this.title = title;
        this.description = description;
        this.group = group;
        this.when = when;
    }
}

export enum Color{
    RED,GREEN
}