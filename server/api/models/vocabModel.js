const mongoose = require('mongoose')

const vocabSchema = mongoose.Schema({
    english:{
        type: String,
        required : [true, "English word cannot empty!"],
        maxlength: [30, "Maximum lettes is 30"],
        unique: true
    },
    german:{
        type: String,
        required : [true, "German word cannot empty!"],
        maxlength: [30, "Maximum lettes is 30"],
        unique: true
    },
    vietnamese:{
        type:String,
        required : [true, "Vietnamese word cannot empty!"],
        maxlength: [30, "Maximum lettes is 30"],
        unique: true
    },
    dateTime:{
        type: Date,
        default: Date.now
    }
})

const vocabModel = mongoose.model('vocabs', vocabSchema)
module.exports = vocabModel