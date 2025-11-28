const testModel = require('../models/testModel')

const getAllTest = async(req,res)=>{
    try{
        const response = await testModel.find({}).sort({dateTime:-1})
        res.status(200).json(response)
    } catch(err){
        console.error(err)
    }
} 

const createTest = async(req,res)=>{
    try{
        const response = await testModel.create(req.body)
        res.status(200).json(response)
    } catch(err){
        console.error(err)
    }
}

const deleteTestById = async(req,res)=>{
    try{
        const response = await testModel.findByIdAndDelete(req.params.id)
        res.status(201).json({"message":"Delete success!"})
    } catch(err){
        console.error(err)
    }
}

module.exports = {
    getAllTest,
    createTest,
    deleteTestById
}