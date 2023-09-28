var URL = process.env.API_URL+'/cataloge'
module.exports = function(router) {
    var catalogeController = require('../controllers/cataloge.controller');
    router.post(URL+'/create', catalogeController.Create)
    // router.post(URL+'/edit', catalogeController.Update)
    router.delete(URL+'/delete/:id', catalogeController.Delete)
    router.get(URL+'/get-all', catalogeController.GetAll)
    router.post(URL+'/admin-create', catalogeController.AdminCreate)
}