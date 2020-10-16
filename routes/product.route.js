const productRouteExpress = require('express');
const router = productRouteExpress.Router();
// const multer = require('multer');
// const path = require('path');

const productController = require('../controllers/product.controller');
//
// router.post('/create', upload.array('eventFileInput', 12), productController.events_create);
// router.post('/create', productController.ytplayLive_create);
router.get('/getProducts', productController.allProducts);
// router.get('/:id', productController.ytplayLive_details);
// router.put('/:id/update', productController.ytplayLive_update);
// router.delete('/:id/delete', productController.ytplayLive_delete);
// router.delete('/drop', productController.ytplayLive_collection_drop);


module.exports = router;
