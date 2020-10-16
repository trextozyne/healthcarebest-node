const productModel = require('../models/product.model');
// var fs = require('fs');
const mongoose = require('mongoose');
const conn = mongoose.connection;
// let path = require('path');
// let mongodb = require('mongodb');


// exports.ytplayLive_create = async (req, res, next) => {
//     let ytplayLive = new productModel(
//         {
//             ytlivelink: req.body.ytlivelink
//         }
//     );
//
//     ytplayLive.save(function (err, ytplayLive) {
//         if (err) {
//             return next(err);
//         }
//     });
//
//     res.send(ytplayLive._id)
// };

exports.allProducts = async (req, res, next) => {
    productModel.find(({}),  (err, products) => {
        if (err) { return next(err); }

        res.status(200).json({products});
    });
};

// exports.ytplayLive_details = function (req, res, next) {
//     productModel.findById(req.params.id, function (err, ytplayLive) {
//         if (err) return next(err);
//         res.send(ytplayLive);
//     })
// };

// exports.ytplayLive_update = function (req, res, next) {
//     const ytlivelink = req.body.ytlivelink;
//
//     productModel.updateMany({"_id": req.params.id}, {
//         $set: {
//             "ytlivelink" : ytlivelink
//         }
//     },{multi: true}, function (err, ytplayLive) {
//         if (err) return next(err);
//         res.send(req.body._id);
//     });
// };
//
// exports.ytplayLive_delete = function (req, res, next) {
//     productModel.findByIdAndRemove (req.params.id, function (err, ytplayLive) {
//         console.log(ytplayLive);
//         if (err) return next(err);
//         res.send(ytplayLive);
//     })
// };
//
// exports.ytplayLive_collection_drop = function (req, res, next) {
//     let ytplayLives = conn.db.collection('ytplayLives');
//     ytplayLives.drop();
//     res.send("dropped");
// };
