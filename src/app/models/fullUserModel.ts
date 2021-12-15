export class FullUserModel {

    id?: number | string;
    name: string;
    lastName: string;
    prefix: string;
    title: string;
    imageUrl: string;
    jobDescriptor: string;
    jobArea: string;
    jobType: string;
    email: string;
    ip: string;
    company: {
        name: string,
        suffix: string;
    };
    address: {
        zipCode: string;
        city: string;
        streetAddress: string;
        country: string;
        state: string;


    }
    constructor(id: string | number, name: string, lastName: string, prefix: string, title: string, imageUrl: string, jobDescriptor: string,
        jobArea: string, jobType: string, email: string, ip: string, company: {
            name: string,
            suffix: string;
        }, address: {
            zipCode: string;
            city: string;
            streetAddress: string;
            country: string;
            state: string;


        }) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.prefix = prefix;
        this.title = title;
        this.imageUrl = imageUrl;
        this.jobDescriptor = jobDescriptor;
        this.jobArea = jobArea;
        this.jobType = jobType;
        this.email = email;
        this.ip = ip;
        this.company = company;
        this.address = address
    }
}