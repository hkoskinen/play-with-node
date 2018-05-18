
// TODO: Never trust user input. Note the POST /api/cars route!

const express = require('express');
const app = express();
const bodyParses = require('body-parser');

app.use(bodyParses.json());

const cars = [
  { id: 1, manufacturer: 'Nissan', model: 'GT-R', year: 2014 },
  { id: 2, manufacturer: 'Subaru', model: 'BRZ', year: 2017 },
  { id: 3, manufacturer: 'Mitsubishi', model: 'Evolution X', year: 2016 },
  { id: 4, manufacturer: 'Ford', model: 'Mustang GT', year: 2017 },
  { id: 5,manufacturer: 'Dodge', model: 'Challenger SRT Demon', year: 2018 }
];

app.get('/api/cars', (req, res) => {
  res.status(200).json(cars);
});

app.get('/api/cars/:id', (req, res) => {
  const car = cars.find(car => car.id === parseInt(req.params.id));
  if (car)
    res.status(200).json(car);
  else
    res.status(404).json(`Car with an id [${req.params.id}] not found`);
});

app.post('/api/cars', (req, res) => {
  console.log(req.body);
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
