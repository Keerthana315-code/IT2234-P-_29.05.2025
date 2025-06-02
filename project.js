const mongoose = require('mongoose')
const projectSchema = new mongoose.Schema({
    //projectId:{type:String,require:true},
    name:{type:String,require:true},
    no_of_project:{type:Number,require:true},

})

const project = mongoose.model('projects',projectSchema)
const BIT = new project({
   // projectId:'pro002',
    name:'python code',
    no_of_project:10,
})

BIT.save()
module.exports=project