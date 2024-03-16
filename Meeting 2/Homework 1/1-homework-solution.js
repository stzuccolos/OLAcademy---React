function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.owners = [];

  this.getCarInfo = function () {
    return `${make} ${model} released in ${year}`;
  };

  this.addOwner = function (person) {
    this.owners.push(person);
  };
  this.removeOwner = function (person) {
    this.owners.pop(person);
  };
  this.getOwnersCount = function () {
    return this.owners.length;
  };
  this.getOwnerNames = function () {
    return this.owners.map((x) => x.fullName());
  };

  this.getFullInfo = function () {
    return `${make} ${model} from ${year}. ${this.getOwnersCount()} person owns this car. These are - ${this.getOwnerNames().join(", ")}.`;
  };
}

function Person(name, surname, age, gender, cars = []) {
  this.name = name;
  this.surname = surname;
  this.age = age;
  this.gender = gender;
  this.cars = cars;

  this.fullName = function () {
    return `${name} ${surname}`;
  };

  this.countCars = function () {
    return cars.length;
  };
  this.buysCar = function (car) {
    this.cars.push(car);
    car.addOwner(this);
  };
  this.sellsCar = function (car) {
    this.cars.pop(car);
    car.removeOwner(this);
  };

  this.getAllCarsInfo = function () {
    return `${this.name} owns these cars: ${this.cars.map(x => x.getCarInfo()).join(', ')}.`;
  };
}

module.exports = { Car, Person };
