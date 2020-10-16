const customerRouteExpress = require('express');
const router = customerRouteExpress.Router();
// const multer = require('multer');
// const path = require('path');

const customerController = require('../controllers/customer.controller');
//
// router.post('/create', upload.array('eventFileInput', 12), customerController.events_create);
// router.post('/create', customerController.ytplayLive_create);
router.get('/getCustomers', customerController.allCustomers);
// router.get('/:id', customerController.ytplayLive_details);
// router.put('/:id/update', customerController.ytplayLive_update);
// router.delete('/:id/delete', customerController.ytplayLive_delete);
// router.delete('/drop', customerController.ytplayLive_collection_drop);


module.exports = router;
