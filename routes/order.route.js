const orderRouteExpress = require('express');
const router = orderRouteExpress.Router();
// const multer = require('multer');
// const path = require('path');

const orderController = require('../controllers/order.controller');
//
// router.post('/create', upload.array('eventFileInput', 12), orderController.events_create);
// router.post('/create', orderController.ytplayLive_create);
router.get('/getOrders', orderController.allOrders);
// router.get('/:id', orderController.ytplayLive_details);
// router.put('/:id/update', orderController.ytplayLive_update);
// router.delete('/:id/delete', orderController.ytplayLive_delete);
// router.delete('/drop', orderController.ytplayLive_collection_drop);


module.exports = router;
