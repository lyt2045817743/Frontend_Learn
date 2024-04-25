function Car(color) {
    this.color = color;
}

Car.prototype.start = function() {
    console.log(this.color + " car start");
}

function create(constructorName, ...args) {
    const obj = Object.create(constructorName.prototype);
    const result = constructorName.apply(obj, args);
    return result || obj;
}

var car = create(Car, "black");
console.log(car);
car.start()