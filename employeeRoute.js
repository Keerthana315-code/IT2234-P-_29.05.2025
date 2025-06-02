const express=require('express')
const router = express.Router()
const employee = require('../Models/employee')
const { mongoose } = require('mongoose')

router.get('/course', async (req,res)=>{
    try {
        const results = await employee.find({},{name:1,degreeId:0}).populate("projectId").populate("entroled_courses")
        if (results) {
            res.status(200).json(results)
        } else {
            res.status(404).send("Sorry, No Data Found !")
        }  
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error !")
    }   
})

router.get('/:id', async (req,res)=>{
    try {
        const id = req.params.id
        const results = await employee.findById(id)
        if (results) {
            res.status(200).json(results)
        } else {
            res.status(404).send("Sorry, No Data Found !")
        }  
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error !")
    }   
})
router.get('/code/:cid', async (req,res)=>{
    try {
        const cid = req.params.cid
        const results = (await employee.find({code:cid}))
        const count = results.length
        console.log(count)
        if (results) {
            if (count>0){
                res.status(200).json(results)
            }
            else {
                res.status(404).send("Sorry, No Data Found !")
            }  
           
        } else {
            res.status(404).send("Sorry, No Data Found !")
        }  
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error !")
    }   
})

router.post('/', async (req,res)=>{
    try {
        const {_id,name,no_of_employee} = req.body
        if (_id||!name||!no_of_employee) {
            res.status(400).send("Please provide the required fileds!")
        } else {
            const results = await employee.create({_id,name,no_of_employee})
            res.status(200).json(results)
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error !")
    }   
})

router.put('/:id', async (req,res)=>{
    try {
        const id = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return  res.status(400).send("Invaild ID !")
        }
        const ustudent = await employee.findById(id)
        const {_id,name,no_of_employee} = req.body
        if (_id||!name||!no_of_employee) {
            res.status(400).send("Please provide the required fileds!")
        } else {
            const results = await uemployee.updateOne({_id,name,no_of_employee})
            res.status(200).json(results)
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error !")
    }   
})


router.delete('/:id', async (req,res)=>{
    try {
        const id = req.params.id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return  res.status(400).send("Invaild ID !")
        }
        const demployee = await employee.findById(id)
        const results = await demployee.deleteOne(demployee).catch(
            (error)=>{ return res.status(500).json(error)}
        )
        res.status(200).json(results)
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error !")
    }   
})
module.exports=router