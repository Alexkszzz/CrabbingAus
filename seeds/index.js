const mongoose = require('mongoose');
const CrabSpot = require('../models/crabspot');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/crab-aus')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('database connected')
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await CrabSpot.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const rand543 = Math.floor(Math.random() * 543);
        const spot = new CrabSpot({
            location: `${cities[rand543].city}, ${cities[rand543].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        });
        await spot.save();
    }
}

seedDB();