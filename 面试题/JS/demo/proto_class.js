class People {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(`My name is ${this.name}`);
  }
}

class Student extends People {
  constructor(name, studyNum) {
    super(name);
    this.studyNum = studyNum;
  }

  sayHi() {
    console.log(`Hi, my name is ${this.name}, my studyNum is ${this.studyNum}`);
  }
}
