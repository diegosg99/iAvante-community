export class User {
    uid: string;
    role:string;
    email: string;
    password: string;
    username: string;
    fullName: string;
    photo: string;
    proffesion: string;
    age: string;
    questions: string;
    answers: string;
    posts: string;
    instagram: string;
    facebook: string;
    twitter: string;
    linkedin: string;
    status: number;
    created_at: string;

    constructor(uid:string,email:string,password:string,username:string,
        fullName:string,age:string,photo:any='',proffesion:string='',
        questions:string='',answers:string='',posts:string='',instagram:string='',
        facebook:string='',twitter:string='',linkedin:string='') {
        
        this.role = 'user';
        this.uid = uid;
        this.email= email;
        this.password= password;
        this.username= username;
        this.fullName= fullName;
        this.photo= photo;
        this.proffesion = proffesion;
        this.age= age;
        this.questions= questions;
        this.answers= answers;
        this.posts= posts;
        this.instagram= instagram;
        this.facebook= facebook;
        this.twitter= twitter;
        this.linkedin = linkedin;
        this.status = 0;
        this.created_at = "";

    }
}