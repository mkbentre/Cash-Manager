var URL = process.env.API_URL+'/wallet'
module.exports = function(router) {
    var walletController = require('../controllers/wallet.controller');
    router.post(URL+'/create', walletController.Create)
    router.delete(URL+'/delete', walletController.Delete)
    router.post(URL+'/getall', walletController.GetAll)
}