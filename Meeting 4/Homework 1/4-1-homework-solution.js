const carFunctions = {
  getCarInfo() {
    return `${this.make} ${this.model} released in ${this.year}`;
  },

  addOwner(person) {
    this.owners.push(person);
  },

  removeOwner(person) {
    this.owners.pop(person);
  },

  getOwnersCount() {
    return this.owners.length;
  },

  getOwnerNames() {
    return this.owners.map((x) => x.fullName());
  },

  getFullInfo() {
    return `${this.make} ${this.model} from ${this.year}. ${this.getOwnersCount()} person owns this car. These are - ${this.getOwnerNames().join(
      ", "
    )}.`;
  },
};

function createCar(make, model, year) {
  let car = Object.create(carFunctions);
  car.make = make;
  car.model = model;
  car.year = year;
  car.owners = [];
  return car;
}

const personFunctions = {
  fullName() {
    return `${this.name} ${this.surname}`;
  },

  countCars() {
    return this.cars.length;
  },

  buysCar(car) {
    this.cars.push(car);
    car.addOwner(this);
  },

  sellsCar(car) {
    this.cars.pop(car);
    car.removeOwner(this);
  },

  getAllCarsInfo() {
    return `${this.name} owns these cars: ${this.cars
      .map((x) => x.getCarInfo())
      .join(", ")}.`;
  },
};

function createPerson(name, surname, age, gender, cars = []) {
  var person = Object.create(personFunctions);
  person.name = name;
  person.surname = surname;
  person.age = age;
  person.gender = gender;
  person.cars = cars;
  return person;
}

module.exports = { createCar, createPerson }
