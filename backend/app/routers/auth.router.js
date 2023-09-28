module.exports = function(router) {
    var JWT = require('../common/JWT');
    var userController = require('../controllers/user.controller');
    router.post(process.env.API_URL+'/get-token', userController.checkUser)
}