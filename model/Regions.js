'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const RegionsSchema = new Schema({
    name: String,
    sub_regions: [String],
    lat: Number,
    long: Number
});

module.exports = mongoose.model('Regions', RegionsSchema);