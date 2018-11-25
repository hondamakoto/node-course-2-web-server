const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// To keep track how our server is working
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = now + ': ' + req.method + req.url;
  console.log(log);
fs.appendFile('server.log', log +'\n', (err) => {
    if(err) {
      console.log('Unable to qppend to server.log.');
    }
  });
  next();
});

// For maintenance usage
// You can't go ahead if the followoing statements are active
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


app.get('/', (req, res) => {
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to our home page.'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page2'
  });
});

app.get('/bad', (req, res) =>{
  res.send({
    errorMessage: 'Unable to handle request',
    handling: [
      'Reset',
      'Rebooting'
    ]
  })
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
