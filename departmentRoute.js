const express=require('express')
const router = express.Router()
const department = require('../Models/department')
const { mongoose } = require('mongoose')

router.get('/', async (req,res)=>{
    try {
        const results = await Course.find()
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
        const results = await department.findById(id)
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
        const results = (await department.find({code:cid}))
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
        if (!_id || !name || !no_of_employee) {
            res.status(400).send("Please provide the required fileds!")
        } else {
            const results = await Course.create({_id,name,no_of_employee})
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
        const udepartment = await department.findById(id)
        const {_id,name,no_of_employee} = req.body
        if (!code || !name || !credits) {
            res.status(400).send("Please provide the required fileds!")
        } else {
            const results = await ucourse.updateOne({_id,name,no_of_employee})
            res.status(200).json(results)
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error !")
    }   
})
router.get('empcount',async(req,res)=>
{
    try{
        const results = await department.aggregate([
            {
                $lookup:{
                    from:"employees",
                    localField:"_id",
                    foreignField:"departmentId",
                    as:"emps"
                }
            },
            {
                $project:{
                    name:1,
                    location:1,
                    number_of_employees:{$size:"$emp"}

                }
            }
        ]);
        if(results)
            {
                res.status(200).json(filterResult)
            }
            else
            {
                res.status(404).send("sorry! no data found")
            }
    }catch (error) {
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
        const ddepartment = await department.findById(id)
        const results = await ddepartment.deleteOne(ddepartment).catch(
            (error)=>{ return res.status(500).json(error)}
        )
        res.status(200).json(results)
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error !")
    }   
})

router.get('/procount/',async(req,res)=>
{
    try {
        const results = await employee.find()
        const newresults = results.map(emp=>({
            id:emp._id,
            name:emp.name,
            name_of_projects:emp.projectId.length
        }))
        if(results)
            {
                res.status(200).json(newResults)
            }
            else
            {
                res.status(404).send("sorry! no data found")
            }
    }catch (error) {
        console.error(error);
        res.status(500).send("Server Error !")
    }   
    
})

router.get('/emp/:did',async(req,res)=>{
    const did = req.params.did
    const results = await employee.find(
        {departmentId:did},
        {name:1,departmentId:1}
    ).populate("departmentId")
    const filterResult=results.map(emp=>({
        employee_id:emp._id,
        employee_name:emp.name,
        department_name:emp.departmentId.name

    }))
    if(results)
    {
        res.status(200).json(filterResult)
    }
    else
    {
        res.status(404).send("sorry! no data found")
    }
})

// find how many employees are working in a department
//show the employee count along with each department details
//along with distinct position , show how many employees hold that position
//like engineers:2
//Hr:1
module.exports=router

