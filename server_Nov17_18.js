const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  // return 'test'
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs',{
    pageTitle: 'Home Page',
//    currentYear: new Date().getFullYear(),
    welcomeMessage: 'Welcome to our home page.'
  });
});

app.get('/about', (req, res) => {
  // res.send('About Page');
  res.render('about.hbs',{
    pageTitle: 'About Page2',
    // pageTitle: 'About Page2',
    // currentYear: new Date().getFullYear()
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
