const mongoose = require ('mongoose')
const departmentSchema = new mongoose.Schema({
  //  _id:{type:String},
    name:{type:String},
    no_of_employee:{type:Number},

})

const department = mongoose.model('departments',departmentSchema)
const webservice = new department({
 //  _id:'dep001',
   name:'madicine',
   no_of_employee:210,
})
webservice.save()
module.exports = department