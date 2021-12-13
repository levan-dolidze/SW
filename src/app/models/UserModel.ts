export class UserModel {
    id?:string|number;
    name: string;
    lastName: string;
    prefix: string;
    title: string;
    imageUrl: string;
    constructor(id:string|number,name: string, lastName: string, prefix: string, title: string, imageUrl: string) {
        this.id=id;
        this.name = name;
        this.lastName = lastName;
        this.prefix = prefix;
        this.title = title;
        this.imageUrl = imageUrl;
    }
}