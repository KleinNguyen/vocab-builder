const mongoose = require('mongoose')

const testSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    testType:{
        type: String,
        enum:["typing"],
        required:true
    },
    vocabs:[{
        type: mongoose.Schema.ObjectId,
        ref: 'vocabs'
    }],
    dateTime:{
        type: Date,
        default: Date.now
    }
})

const testModel = mongoose.model('tests', testSchema)
module.exports = testModel