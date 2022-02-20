const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CrabspotSchema = new Schema({
    title: String,
    description: String,
    location: String
});

module.exports = mongoose.model('CrabSpot', CrabspotSchema);