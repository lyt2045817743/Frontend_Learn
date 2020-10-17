class People{
    constructor(name){
        this.name=name;
    }
}
class Student extends People{
    constructor(name,sId){
        super(name);
        this.sId=sId;
    }
}

const s=new Student('xiaoa',111);
People.age=20;
console.log(People.age);
