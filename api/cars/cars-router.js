// DO YOUR MAGIC
const express = require('express')
// const db = require('../../data/db-config.js')
const Cars = require('./cars-model.js')
const mw = require('./cars-middleware.js')
const router = express.Router()

router.get('/', (req, res) => {
    Cars.getAll()
        .then(cars => {
            res.status(200).json(cars)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: err.message });
        })

})

router.get('/:id', mw.checkCarId, (req, res) => {
    const { id } = req.params;
    Cars.getById(id)
        .then(car => {
            res.status(200).json(car)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: err.message });
        })
})

router.post('/', mw.checkCarPayload, mw.checkVinNumberUnique, mw.checkVinNumberValid, (req, res) => {
    Cars.create()
        .then(newCar => {
            res.status(201).json(newCar)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: err.message });
        })
})

// router.get('/', async (req, res) => { 
//     const allCars = await Cars.getAll()
//     res.status(200).json(allCars)
// })




module.exports = router;