var URL = process.env.API_URL+'/transaction'
module.exports = function(router) {
    var transactionController = require('../controllers/transaction.controller');
    router.post(URL+'/create', transactionController.Create)
    // router.post(URL+'/edit', transactionController.Update)
    // router.delete(URL+'/delete/:id', transactionController.Delete)
    // router.get(URL+'/get-by-day', transactionController.GetByDay)
    // router.get(URL+'get-select-day', transactionController.GetSelectDay)
}