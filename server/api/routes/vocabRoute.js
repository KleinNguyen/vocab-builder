const vocabController = require('../controllers/vocabController')

const vocabRoute = (app)=>{

    // API no ID
    app.route('/api/vocabs')
        .get(vocabController.getAllVocab)
        .post(vocabController.addNewVocab)
        .delete(vocabController.deleteAllVocab)

    // api sortAsc
    app.route('/api/vocabs/sort-asc')
        .get(vocabController.sortAsc)
    
    // api sortDesc
    app.route('/api/vocabs/sort-desc')
        .get(vocabController.sortDesc)

    // API with ID    
    app.route('/api/vocabs/:id')
        .get(vocabController.getVocabById)
        .put(vocabController.updateVocab)
        .delete(vocabController.deleteVocabById)

}

module.exports = vocabRoute