const express = require('express');
const { check } = require('express-validator');

const carControllers = require('../controllers/cars-controllers');

const checkAuth = require('../middleware/check-auth');
const router = express.Router();
router.use(checkAuth);
router.get('/', carControllers.getCars);
router.get('/:cid', carControllers.getCarById);

router.get('/user/:uid', carControllers.getCarsByUserId);



router.post('/',
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
