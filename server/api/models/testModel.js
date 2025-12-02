const mongoose = require('mongoose')

const testSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    testType:{
        type: String,
        required:true
    },
    totalQuestions:{
        type: Number,
        required: true
    },
    questionLanguage:{
        type: String,
        // required:true

    },
    answerLanguage:{
        type: String,
        // required:true
    },
    tests:[{
        _id: false,
        vocabId: {
            type: mongoose.Schema.ObjectId,
            ref: 'vocabs',
            required: true
        },
        question: {
            type: String,
            // required: true
        },
        answer: {
            type: String,
            // required: true
        }
    }],
    dateTime:{
        type: Date,
        default: Date.now
    }
})

const testModel = mongoose.model('tests', testSchema)
module.exports = testModel