const http = require('http');

const PORT = 3000;
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Welcome!');
    res.end();
  }
  else if (req.url === '/api/cars') {
    res.write(JSON.stringify([
      { id: 1, model: 'BRZ', manufacturer: 'Subaru', year: 2017 },
      { id: 1, model: 'GT-R', manufacturer: 'Nissan', year: 2014 }
    ]));
    res.end();
  }
  else {
    res.write('404 - Not Found');
    res.end();
  }
});


server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
