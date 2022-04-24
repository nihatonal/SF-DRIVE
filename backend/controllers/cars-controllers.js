const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Car = require("../models/car");
const User = require("../models/user");

// Getting a photo of just a car

const getCarById = async (req, res, next) => {
  const carId = req.params.cid;

  let car;
  try {
    car = await Car.findById(carId);
  } catch (err) {
    const error = new HttpError(
      "Something wen wrong, could not find a car.",
      500
    );
    return next(error);
  }

  if (!car) {
    const error = new HttpError(
      "Could not find a place for the provided id.",
      404
    );
    return next(error);
  }

  res.json({ car: car.toObject({ getters: true }) }); // => { car } => { car: car }
};

// Getting all car photos of a users

const getCarsByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let cars;
  try {
    cars = await Car.find({ creator: userId });
  } catch(err) {
    const error = new HttpError(
      'Fetching cars failed, please try again later.',
      500
    );
    return next(error);
  }
  let userWithCars;
  try {
    userWithCars = await User.findById(userId).populate("cars");
  } catch (err) {
    const error = new HttpError(
      "Fetching cars failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!userWithCars || userWithCars.cars.length === 0) {
    return next(
      new HttpError("Could not find cars for the provided user id.", 404)
    );
  }

  res.json({
    cars: userWithCars.cars.map((car) => car.toObject({ getters: true })),
  });
};

// Create a car

const createCar = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const {
    brand,
    model,
    year,
    plate_number,
    vin_number,
    color,
    engine_type,
    engine_volume,
    engine_power,
    engine_transmission,
    engine_run,
    pts,
    sts,
    price,
    price_for3,
    price_more5,
    policy,
    insurance,
    options,
    services,
    images,
    carDocs,
    owner,
  } = req.body;

  const createdCar = new Car({
    brand,
    model,
    year,
    plate_number,
    vin_number,
    color,
    engine_type,
    engine_volume,
    engine_power,
    engine_transmission,
    engine_run,
    pts,
    sts,
    price,
    price_for3,
    price_more5,
    policy,
    insurance,
    options,
    services,
    images,
    carDocs,
    owner,
  });

  let user;

  try {
    user = await User.findById(owner);
  } catch (err) {
    const error = new HttpError(
      "Creating place failed, user please try again.",
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      `Could not find user for provided id.${owner}`,
      404
    );
    return next(error);
  }

  console.log(user);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdCar.save({ session: sess });
    user.cars.push(createdCar);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Creating place failed, please try again.",
      500
    );
    console.log(err);
    return next(error);
  }

  res.status(201).json({ car: createdCar });
};

// Update a Car Info

const updateCar = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description } = req.body;
  const carId = req.params.cid;

  let car;
  try {
    car = await Car.findById(carId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update car.",
      500
    );
    return next(error);
  }

  if (car.owner.toString() !== req.userData.userId) {
    const error = new HttpError("You are now allowed to edit this car.", 401);
    return next(error);
  }

  car.title = title;
  car.description = description;

  try {
    await car.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place!!.",
      500
    );
    return next(error);
  }

  res.status(200).json({ car: car.toObject({ getters: true }) });
};

// Delete a Car

const deleteCar = async (req, res, next) => {
  const carId = req.params.cid;

  let car;
  try {
    car = await Car.findById(carId).populate("owner");
  } catch (err) {
    const error = new HttpError(
      "Something  went wrong, could not delete car.",
      500
    );
    return next(error);
  }

  if (!car) {
    const error = new HttpError("Could not find car for this id.", 404);
    return next(error);
  }
  if (car.owner.id !== req.userData.userId) {
    const error = new HttpError("You are now allowed to delete this car.", 401);
    return next(error);
  }

  //const imagePath = car.image

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await car.remove({ session: sess });
    car.creator.cars.pull(car);
    await car.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something  went wrong, could not delete car.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted car." });
};

exports.getCarById = getCarById;
exports.getCarsByUserId = getCarsByUserId;
exports.createCar = createCar;
exports.updateCar = updateCar;
exports.deleteCar = deleteCar;
