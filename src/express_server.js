const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const cars = [
  { id: 1, manufacturer: 'Nissan', model: 'GT-R', year: 2014 },
  { id: 2, manufacturer: 'Subaru', model: 'BRZ', year: 2017 },
  { id: 3, manufacturer: 'Mitsubishi', model: 'Evolution X', year: 2016 },
  { id: 4, manufacturer: 'Ford', model: 'Mustang GT', year: 2017 },
  { id: 5,manufacturer: 'Dodge', model: 'Challenger SRT Demon', year: 2018 }
];

app.get('/api/cars', (req, res) => {
  res.json(cars);
});

app.get('/api/cars/:id', (req, res) => {
  const car = cars.find(car => car.id === parseInt(req.params.id));
  if (car)
    res.json(car);
  else
    res.status(404).json(`Car with an id [${req.params.id}] not found`);
});

app.post('/api/cars', (req, res) => {
  // Add simple input validation...like really simple.
  if (!req.body.manufacturer) return res.status(400).json('Invalid manufacturer name');
  if (!req.body.model) return res.status(400).json('Invalid model name');
  if (!req.body.year || req.body.year.length !== 4 || Number.isNaN(Number(req.body.year)))
    return res.status(400).json('Invalid year');

  const car = {
    id: cars.length + 1,
    manufacturer: req.body.manufacturer,
    model: req.body.model,
    year: req.body.year
  };
  cars.push(car);
  res.status(201).send(car);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
