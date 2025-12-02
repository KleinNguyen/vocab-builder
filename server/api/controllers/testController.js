const testModel = require('../models/testModel')
const vocabModel = require('../models/vocabModel')

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
        const {title, totalQuestions, questionLanguage, answerLanguage, testType} = req.body

        const randomVocab = await vocabModel.aggregate([
            {$sample :{size: totalQuestions}}
        ])

        const qLang = questionLanguage.toLowerCase()
        const aLang = answerLanguage.toLowerCase()

        const questions = randomVocab.map(words=>({
            vocabId: words._id,
            question: words[qLang],
            answer: words[aLang]
        }))

        const response = await testModel.create({
            title,
            testType,
            totalQuestions,
            questionLanguage: qLang,
            answerLanguage: aLang, 
            tests: questions
        })
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

const runTest = async(req,res)=>{
    try{
        const response = await testModel.findById(req.params.id)
        res.status(200).json(response)
    } catch(err){
        console.error(err)
    }
}

module.exports = {
    getAllTest,
    createTest,
    deleteTestById,
    runTest
}