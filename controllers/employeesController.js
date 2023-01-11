const data = {}
data.employees = require("../model/employees.json")

const getAllEmployees = (req, res)=>{
    res.json(data.employees)
}

const postEmployees = (req, res)=>{
    res.json({
        firstname:req.body.firstname,
        lastname: req.body.lastname
    })
}


const putEmployees = (req,res)=>{
    res.json({
        firstname:req.body.firstname,
        lastname: req.body.lastname
    })
}
const deleteEmployees = (req,res)=>{
    res.json({id:req.body.id})
}
const paramsEmployees = (req, res)=>{
    res.json({id:req.params.id})
}

module.exports = {
    getAllEmployees,
    postEmployees,
    putEmployees,
    deleteEmployees,
    paramsEmployees
}