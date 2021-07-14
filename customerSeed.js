const mongoose = require('mongoose');
const Product = require('./models/customer.js');

mongoose.connect('mongodb://localhost:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('started database');
    })
    .catch((err) => {
        console.log("error");
        console.log(err)
    })
const a = [{FullName:"Devansh Rathi",username:"devanshrathi@loduchand.com" ,password:"lodudeva123"},{
  FullName:"Anchit kothari",username:"anchitkothari121@gmail.com" ,password:"jtcanchit123"
}];
Product.insertMany(a).then((r) => {
    console.log(r);
}).catch((e) => {
    console.log(e)
})
