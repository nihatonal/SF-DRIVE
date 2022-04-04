const express = require('express');
const { check } = require('express-validator');

const carControllers = require('../controllers/cars-controllers');

const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.get('/:cid', carControllers.getCarById);

router.get('/user/:uid', carControllers.getCarsByUserId);

router.use(checkAuth);

router.post('/',
    [
        check('brand')
        .not()
        .isEmpty(),
        check('model').isLength({ min: 1 })
        
    ], 
    carControllers.createCar);

router.patch('/:cid',
    [
        check('title')
        .not()
        .isEmpty(),
        check('description').isLength({ min: 5 })
    ],
    carControllers.updateCar);

router.delete('/:cid', carControllers.deleteCar);

module.exports = router;
