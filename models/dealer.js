const mongoose = require('mongoose');

const dealerSchema = mongoose.Schema({
  FullName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  medicines:
    [{
      name: {
        type: String,
        required: true
      },
      qty: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }]
  ,
  regNumber: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }
})

const Dealer = mongoose.model('Dealer', dealerSchema);

// const bodyparser = require('body-parser');

// app.post('/Dealer', (req, res)=>{
//   var myData = new Dealer(req.body);
//   myData.save().then(()=>{
//     res.send('This medicine has saved into the database')
//   }).catch(()=>{
//     res.status(400).send('medicine was not saved in the database')
//   })
// })

module.exports = Dealer;