const express = require('express');
const app = express();
const port = 3001;
const mongoose = require('mongoose');
const departmentrt = require('./Route/departmentRoute');
const employeert = require('./Route/employeeRoute');
const projectrt = require('./Route/projectRoute');

app.use(express.json())
app.use('/department',departmentrt)
app.use('/employee',employeert)
app.use('/project',projectrt)


mongoose.connect('mongodb://localhost:27017/EmployeeDB').then(()=>{
    console.log("Database connected")
}).catch((error)=> {
    console.error(error);
})

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})
