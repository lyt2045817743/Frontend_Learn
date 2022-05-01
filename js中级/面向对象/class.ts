class Person {
  name
  protected weight
  private id
  static className = '人'
  house

  constructor(name: string, weight?: string, house?: House) {
      this.name = name;
      this.weight = weight;
      this.house = house;
  }
  
  getName() {
      return this.name;
  }
}

class Student extends Person {
  num
  private girl

  constructor(name: string, weight: string, num: string, girl: string) {
      super(name, weight)
      this.girl = girl
      this.num = num
  }

  getWeight() {
      return this.weight;
  }

  getName() {
    return this.name + '(student)';
  }
}

class Teacher extends Person {
  constructor(name) {
    super(name);
  }
}

class House {
  city: string

  constructor(city) {
    this.city = city;
  }
}

console.log('============= 封装&继承 ================');
const p = new Student('lyt', '120', 'A1', 'lily');
console.log(Student.className + '，' + p.getWeight()) // 101，120
// console.log(p.girl); // 报错 属性“girl”为私有属性，只能在类“Student”中访问。

console.log('============= 多态 ================');
const p2 = new Student('lyt', '120', 'A1', 'lily');
console.log(p2.getName());
const t = new Teacher('Miss Li');
console.log(t.getName());

console.log('============= 类的关联关系 ================');
const h = new House('北京');
const p3 = new Person('lyt', '90', h);
console.log(p3); // Person { name: 'lyt', weight: '90', house: House { city: '北京' } }
