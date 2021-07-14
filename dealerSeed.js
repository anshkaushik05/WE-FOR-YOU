const mongoose = require('mongoose');
const Dealer = require('./models/dealer')

mongoose.connect('mongodb://localhost:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Mongo Connected");
    })
    .catch(err => {
        console.log("Error!!", err);
    })

const d = new Dealer({
    FullName: "Bhavesh Agrawal",
    username: "bhavrandi69@irandi.com",
    password: 'MyPosition@69',
    address: 'Alwar, Rajasthan',
    medicines: { name: 'ganja', qty: 69, price: 10000 },
    city: 'Alwar',
    phone: '9999999999',
    regNumber: 'BHA-6969'
})

d.save();