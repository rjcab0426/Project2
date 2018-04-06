var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Customer = require('../models/Customer');

/* GET customers listing. */
router.get('/', function(req, res, next) {
    Customer.find().exec((err, data) => {
        if(err) {
            res.status(400).send({
                message: 'Something is not right.',
                err: err,
                success: false
            });
        } else {
            res.status(200).send({
                message: 'Customers fetched successfully!',
                customers: data,
                success: true
            })
        }
    });
});


/** GET customer by ID */
router.get('/:id', (req, res) => {
    Customer.findById(req.params.id).exec((err, data) => {
        if(err) {
            res.status(400).send({
                message: 'Something is not right.',
                err: err,
                success: false
            });
        } else {
            res.status(200).send({
                message: 'Customer fetched successfully!',
                customer: data,
                success: true
            })
        }
    });
})


/**POST (insert) data to the Customers collection */
router.post('/', (req, res) => {
    var customerData = req.body;

    Customer.create(customerData, (err, data) => {
        if(err) {
            res.status(400).send({
                message: 'Something is not right.',
                err: err,
                success: false
            });
        } else {
            res.status(200).send({
                message: 'Customer created successfully!',
                customer: data,
                success: true
            })
        }
    });
})

/**DELETE the customer by ID */
router.delete('/:id', (req, res) => {
    Customer.findByIdAndRemove(req.params.id).exec((err) => {
        if(err) {
            res.status(400).send({
                message: 'Something is not right.',
                err: err,
                success: false
            });
        } else {
            res.status(200).send({
                message: 'Customer deleted successfully!',                
                success: true
            })
        }
    });
})

/**Update (PUT) customer data by ID */
router.put('/:id', (req, res) => {
    var customerData = req.body;
    
    Customer.findByIdAndUpdate(req.params.id, customerData).exec((err, data) => {
        if(err) {
            res.status(400).send({
                message: 'Something is not right.',
                err: err,
                success: false
            });
        } else {
            res.status(200).send({
                message: 'Customer updated successfully!',                
                customer: {
                    old: data,
                    new: customerData
                },
                success: true
            })
        }
    });
})

/**Search data from customer collection */
router.get('/search/:q', (req, res) => {
    var query = req.params.q;

    Customer.find({
        $text: { $search: query } //Full-text Search in MongoDB
    }).exec((err, data) => {
        if(err) {
            res.status(400).send({
                message: 'Something is not right.',
                err: err,
                success: false
            });
        } else {
            res.status(200).send({
                message: 'Customer searched successfully!',
                customers: data,
                success: true
            })
        }
    });
})

module.exports = router;

