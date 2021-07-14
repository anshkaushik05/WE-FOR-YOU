const mongoose=require("mongoose");


const CustomerSchema=mongoose.Schema({
  FullName:{
    type: String,
    required:true
  },
  username:{
    type: String,
    required:true
  },
  password:{
    type: String,
    required:true
  }
})

const Customer=mongoose.model('Customer', CustomerSchema);

module.exports=Customer;