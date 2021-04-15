// const { getById } = require("./cars-model")
const cars = require('./cars-model.js')
const vinValidator = require('vin-validator');
const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  // const car = await getById(req.params.id)
  // if (car) {
  //   req.car = car
  //   next()
  // } else {
  //   res.status(404).json({ message: "car not found" })
  // }
  const car = await cars.getById(req.params.id)
  if (!car || Object.keys(car).length === 0) {
    return res.status(404).json({ message: "car with id <car id> is not found" });
  }
  next();

}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if (!req.body.vin || !req.body.make || !req.body.model || !req.body.mileage) {
    let message = "";
    if (!req.body.vin) {
      message += "vin ";
    }
    if (!req.body.make) {
      message += "make ";
    }
    if (!req.body.model) {
      message += "model ";
    }
    if (!req.body.mileage) {
      message += "mileage ";
    }
    message += "is missing";
    return res.status(400).json({ message: message });
  }
  next()
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const isValid = vinValidator.validate(req.body.vin)
  if (!isValid) {
    return res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
  }
  next()
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const allCars = await cars.getAll()
  if (allCars.some(car => car.vin == req.body.vin && car.id != req.params.id)) {
    return res.status(400).json({ message: `vin ${req.body.vin} already exists` });
  }
  next()
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}