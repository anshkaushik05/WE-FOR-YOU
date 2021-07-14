const express = require('express');
const path = require('path');
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ encoded: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "static")));
const mongoose = require('mongoose');
const Dealer = require('./models/dealer');
const Customer = require('./models/customer.js');
const session = require('express-session');
const inSession = { secret: 'ThereIsNoSecret', resave: true, saveUninitialized: true };
app.use(session(inSession));
mongoose.connect('mongodb://localhost:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('started database');
  })
  .catch((err) => {
    console.log("error");
    console.log(err);
  })

app.get('/', (req, res) => {
  if (req.session.detail) {
    // console.log(`Hello, ${req.session.name}`);
    res.render('index.ejs', { FullName: req.session.detail.FullName });
  }
  else {
    res.render('index.ejs', { FullName: "" });
  }
})

app.get('/donate', (req, res) => {
  // res.render('donatepage.ejs');
  if (req.session.detail) {
    console.log(`Hello, ${req.session.name}`);
    res.render('donatepage.ejs', { FullName: req.session.detail.FullName });
  }
  else {
    res.render('donatepage.ejs', { FullName: "" });
  }
})

app.get('/login', (req, res) => {
  if (req.session.detail) {
    // console.log(`Hello, ${req.session.name}`);
    res.render('loginpage.ejs', { FullName: req.session.detail.FullName });
  }
  else {
    res.render('loginpage.ejs', { FullName: "" });
  }

})


app.get('/customerRegister', (req, res) => {
  if (req.session.detail) {
    // console.log(`Hello, ${req.session.name}`);
    res.render('register_customer.ejs', { FullName: req.session.detail.FullName });
  }
  else {
    res.render('register_customer.ejs', { FullName: "" });
  }

});

app.get('/dealerRegister', (req, res) => {
  res.render('register_dealer.ejs', { FullName: "" });
});

app.post('/login', async (req, res) => {
  const { username, password, type } = req.body;
  if (type === "customer") {
    const customer = await Customer.find({ username, password });
    const tr = { value: true };
    const fl = { value: false };
    if (customer.length) {
      req.session.detail = customer[0];
      req.session.type = 'customer';
      // console.log(`${customer[0].FullName}`);
      // console.log(`Hello, ${req.session.name}`);
      res.send(JSON.stringify(tr));
    }
    else {
      res.json(JSON.stringify(fl));
    }
  }
  if (type === 'dealer') {
    const dealer = await Dealer.find({ username, password });

    const tr = { value: true };
    const fl = { value: false };
    if (dealer.length) {
      req.session.type = 'dealer';

      req.session.detail = dealer[0];

      res.send(JSON.stringify(tr));
    }
    else {
      res.json(JSON.stringify(fl));
    }
  }
})

app.post('/customerRegister', async (req, res) => {
  const { name, email, username, password, confirmpassword } = req.body;
  // console.log(name);
  // console.log(email);
  // console.log(username);
  // console.log(password);
  // console.log(confirmpassword);
  const customer = await Customer.insertMany({
    FullName: name,
    username: username,
    password: password
  })


  res.redirect('/login');
})

app.post('/dealerRegister', async (req, res) => {
  const { name, username, password, confirmpassword, phone, address, city, regNumber } = req.body;
  // console.log(name);
  // console.log(email);
  // console.log(username);
  // console.log(password);
  console.log(phone);
  console.log(req.body);
  const dealer = await Dealer.insertMany({
    FullName: name,
    username: username,
    password: password,
    address: address,
    phone: phone,
    city: city,
    regNumber: regNumber
  })


  res.redirect('/login');
})

app.get('/logout', (req, res) => {
  req.session.detail = {};
  res.redirect('/');
})

app.get('/searchMed', (req, res) => {
  console.log(req.session.detail.FullName);
  res.render('searchmedicine.ejs', { type: req.session.type, FullName: req.session.detail.FullName });
})

app.get('/insert', (req, res) => {
  console.log(req.session.detail.medicines);
  res.render('dealermedicine.ejs', { medicines: req.session.detail.medicines, FullName: req.session.detail.FullName });
})

app.get('/search', async (req, res) => {
  const { medicine, city } = req.query;
  const dealerDet = await Dealer.find({ medicines: { $elemMatch: { name: medicine } } });//.find({ city: city }) - It also works cozz 
  // dealer.find returns an array and find() function also works on array

  let dealerCity = [];
  for (let d of dealerDet) {
    if (d.city === city) {
      dealerCity.push(d);
    }
  }

  res.render('template', { dealers: dealerCity, medicine: medicine, city: city, FullName: req.session.detail.FullName });

})

app.post('/submed', async (req, res) => {
  let { medicine, qty, price } = req.body;
  let dealer = await Dealer.find({ username: req.session.detail.username });
  console.log(req.session.detail);
  console.log(dealer);
  let medicines = dealer[0].medicines;

  console.log(dealer);
  console.log(dealer[0]);
  let flag = 0;
  console.log(medicines);
  for (let m of medicines) {
    if (m.name === medicine) {
      m.qty = qty;
      m.price = price;
      flag = 1;
      break;
    }
  }
  if (!flag) {
    dealer[0].medicines.push({ name: medicine, qty: qty, price: price });
  }
  dealer[0].save();
  req.session.detail = dealer[0];
  console.log(dealer[0]);
  res.redirect('/insert');
})

app.post('/delete', async (req, res) => {
  const dealer = await Dealer.findOne({ username: req.session.detail.username });
  let i = 0;

  for (let med of dealer.medicines) {
    if (med.name === req.body.medName) {
      dealer.medicines.splice(i, 1);
      break;
    }
    i++;
  }
  // console.log(dealer.medicines);
  await dealer.save();
  req.session.detail = dealer;
  res.redirect('/insert');
})

app.listen('3000', () => {
  console.log('Server started');
})

