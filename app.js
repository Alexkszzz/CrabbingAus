const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const CrabSpot = require('./models/crabspot');
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/crab-aus')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('database connected')
})

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/spots', async (req, res) => {
    const spots = await CrabSpot.find({});
    res.render('spots/index', { spots });
})

app.get('/spots/new', (req, res) => {
    res.render('spots/new');
})

app.get('/spots/:id', async (req, res) => {
    const { id } = req.params;
    const spot = await CrabSpot.findById(id);
    res.render('spots/show', { spot });
})

app.get('/spots/:id/edit', async (req, res) => {
    const { id } = req.params;
    const spot = await CrabSpot.findById(id);
    res.render('spots/edit', { spot });
})

app.post('/spots', async (req, res) => {
    const spot = new CrabSpot(req.body.spot);
    await spot.save();
    res.redirect(`/spots/${spot._id}`);
})

app.put('/spots/:id', async (req, res) => {
    const { id } = req.params;
    await CrabSpot.findByIdAndUpdate(id, { ...req.body.spot });
    res.redirect(`/spots/${id}`);
})

app.delete('/spots/:id', async (req, res) => {
    const { id } = req.params;
    await CrabSpot.findByIdAndRemove(id);
    res.redirect('/spots');
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})