const mongoose = require ('mongoose')
const employeeSchema = new mongoose.Schema({
   // _id:{type:String},
    name:{type:String},
   gender:{type:String},
  
   entroled_department:[{type:mongoose.Types.ObjectId,ref:'departments'}]
})
const employee = mongoose.model('employees',employeeSchema)
const BST= new employee({
  //  _id:'2021ICT01',
    name:'Kolins',
    gender:'male',
    projectId:'FAS2000ICT',
   
})

BST.save()
module.exports = employee

