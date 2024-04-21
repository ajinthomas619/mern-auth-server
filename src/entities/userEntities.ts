export interface UserData{
    firstname:string;
    lastname:string;
    email:string;
    password:string;
    mobile:string;
}

export class userProfile{
    firstname:string;
    lastname:string;
    email:string;
    password:string;
    mobile:string;


constructor({firstname,lastname,email,password,mobile}:UserData){
    this.firstname=firstname;
    this.lastname=lastname;
    this.email=email;
    this.password=password;
    this.mobile=mobile;
}
}