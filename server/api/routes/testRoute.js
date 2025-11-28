const testController = require('../controllers/testController')


const testRoute = (app)=>{
    app.route('/api/tests')
        .get(testController.getAllTest)
        .post(testController.createTest)

    app.route('./api/tests/:id')
        .delete(testController.deleteTestById)
}

module.exports = testRoute

