const vocabModel = require('../models/vocabModel')

const getAllVocab = async(req,res) =>{
    try{
        const response = await vocabModel.find({}).sort({dateTime:-1})
        res.status(200).json(response)
    }catch (err){
        console.error(err)
    }
}

const addNewVocab = async(req,res)=>{
    try{
        const response = await vocabModel.create(req.body)
        res.status(201).json(response)
    }catch (err){
        console.error(err)
    }
}

const deleteAllVocab = async(req,res)=>{
    try{
        await vocabModel.deleteMany()
        res.status(200).json({"message":"Delete all words succeed!"})
    }catch (err){
        console.error(err)
    }
}

const getVocabById = async(req,res)=>{
    try{
        const response = await vocabModel.findById(req.params.id)
        res.status(200).json(response)
    } catch (err){
        console.error(err)
    }
}

const updateVocab = async(req,res)=>{
    try{
        const response = await vocabModel.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json("Update word successful!")
    }catch(err){
        console.error(err)
    }
}

const deleteVocabById = async(req,res)=>{
    try{
        const response = await vocabModel.findByIdAndDelete(req.params.id)
        res.status(200).json({"message":"Delete word successful!"})
    }catch(err){
        console.error(err)
    }
}

const sortAsc = async(req,res)=>{
    try{
        const response = await vocabModel.find().sort({english: 1})
        res.status(200).json(response)
    } catch(err){
        console.error(err)
    }
}

const sortDesc = async(req,res)=>{
    try{
        const response = await vocabModel.find().sort({english: -1})
        res.status(200).json(response)
    } catch(err){
        console.error(err)
    }
}

module.exports = {
    getAllVocab,
    addNewVocab,
    deleteAllVocab,
    getVocabById,
    updateVocab,
    deleteVocabById,
    sortAsc,
    sortDesc
}