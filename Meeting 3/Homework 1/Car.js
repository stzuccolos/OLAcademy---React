const { Vehicle } = require("./Vehicle.js");

class Car extends Vehicle {
  constructor(make, model, year) {
    super(make, model);
    this.year = year;
    this.owners = [];
  }

  getCarInfo() {
    return `${this.make} ${this.model} released in ${this.year}`;
  }

  addOwner = function (person) {
    this.owners.push(person);
  };

  removeOwner = function (person) {
    this.owners.pop(person);
  };

  getOwnersCount = function () {
    return this.owners.length;
  };

  getOwnerNames = function () {
    return this.owners.map((x) => x.fullName());
  };

  getFullInfo = function () {
    return `${this.make} ${this.model} from ${this.year}. ${this.getOwnersCount()} person owns this car. These are - ${this.getOwnerNames().join(
      ", "
    )}.`;
  };
}

module.exports = { Car };
