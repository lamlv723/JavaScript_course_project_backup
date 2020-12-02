// 'use strict';

// // Coding Challenge 1
// const Car = function (make, speed) {
//    this.make = make;
//    this.speed = speed;
// };
// Car.prototype.accelerate = function () {
//    this.speed += 10;
//    console.log(`${this.make} is going at ${this.speed} km/h`);
// };
// Car.prototype.brake = function () {
//    this.speed -= 5;
//    console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// // Coding Challenge 2
// class CarCl {
//    constructor(make, speed) {
//       this.make = make;
//       this.speed = speed;
//    }

//    accelerate() {
//       this.speed += 10;
//       console.log(`${this.make} is going at ${this.speed} km/h`);
//    }
//    brake() {
//       this.speed -= 5;
//       console.log(`${this.make} is going at ${this.speed} km/h`);
//    }
//    get speedUS() {
//       return this.speed / 1.6;
//    }
//    set speedUS(speed) {
//       this.speed = speed * 1.6;
//    }
// }

// //  Coding challenge 3

// const Car = function (make, speed) {
//    this.make = make;
//    this.speed = speed;
// };
// Car.prototype.accelerate = function () {
//    this.speed += 10;
//    console.log(`${this.make} is going at ${this.speed} km/h`);
// };
// Car.prototype.brake = function () {
//    this.speed -= 5;
//    console.log(`${this.make} is going at ${this.speed} km/h`);
// };

// const EV = function (make, speed, charge) {
//    Car.call(this, make, speed);
//    this.charge = charge;
// };

// EV.prototype = Object.create(Car.prototype); // linking prototype

// EV.prototype.chargeBattery = function (chargeTo) {
//    this.charge = chargeTo;
// };

// EV.prototype.accelerate = function () {
//    this.speed += 20;
//    this.charge--;
//    console.log(
//       `${this.make} is going at ${this.speed} km/h, with a charge of ${this.batteryCharge}%`
//    );
// };

// const tesla = new EV('Tesla', 120, 23);
// tesla.chargeBattery(90);
// tesla.brake();
// tesla.accelerate();
// console.log(tesla);

// Coding challenge 4
class CarCl {
   //NOTE: dùng constructor
   constructor(make, speed) {
      this.make = make;
      this.speed = speed;
   }
   accelerate() {
      this.speed += 10;
      console.log(`${this.make} is going at ${this.speed} km/h`);
   }
   brake() {
      this.speed -= 5;
      console.log(`${this.make} is going at ${this.speed} km/h`);
      return this; // NOTE: chain methods
   }
   get speedUS() {
      return this.speed / 1.6;
   }
   set speedUS(speed) {
      this.speed = speed * 1.6;
   }
}

class EVCl extends CarCl {
   #charge;

   constructor(make, speed, charge) {
      super(make, speed); // NOTE: Gọi super class là parent class của EVCl
      this.#charge = charge;
   }

   chargeBattery(chargeTo) {
      this.#charge = chargeTo;
      return this; // NOTE: chain method in classes
   }

   accelerate() {
      this.speed += 10;
      this.#charge--;
      console.log(`${this.make} is going at ${this.speed} km/h`);
      return this;
   }
}

const rivian = new EVCl('Rivian', 120, 23);
console.log(rivian);
