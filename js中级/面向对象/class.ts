class Person {
  name
  protected weight
  private id
  static className = '人'

  constructor(name: string, weight: string) {
      this.name = name;
      this.weight = weight
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
}

const p = new Student('lyt', '120', 'A1', 'lily');
console.log(Student.className + '，' + p.getWeight()) // 101，120
// console.log(p.girl); // 报错 属性“girl”为私有属性，只能在类“Student”中访问。
