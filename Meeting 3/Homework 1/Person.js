class Person {
  constructor(name, surname, age, gender, cars = []) {
    this.name = name;
    this.surname = surname;
    this.age = age;
    this.gender = gender;
    this.cars = cars;
  }

  fullName() {
    return `${this.name} ${this.surname}`;
  }

  countCars() {
    return this.cars.length;
  };

  buysCar(car) {
    this.cars.push(car);
    car.addOwner(this);
  };

  sellsCar(car) {
    this.cars.pop(car);
    car.removeOwner(this);
  };

  getAllCarsInfo() {
    return `${this.name} owns these cars: ${this.cars
      .map((x) => x.getCarInfo())
      .join(", ")}.`;
  };
}

module.exports = { Person };