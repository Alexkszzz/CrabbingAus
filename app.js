const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const CrabSpot = require('./models/crabspot');

mongoose.connect('mongodb://localhost:27017/crab-aus')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('database connected')
})

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home')
})
app.get('/addCrabSpot', async (req, res) => {
    const newSpot = new CrabSpot({ title: 'Best spot ever', location: 'Mandurah' })
    await newSpot.save();
    res.send(newSpot);
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})