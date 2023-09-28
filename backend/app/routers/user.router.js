var URL = process.env.API_URL+'/user'
module.exports = function(router) {
    var userController = require('../controllers/user.controller');
    router.post(URL+'/create', userController.Create)
}