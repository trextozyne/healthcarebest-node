const categoryRouteExpress = require('express');
const router = categoryRouteExpress.Router();
// const multer = require('multer');
// const path = require('path');

const categoryController = require('../controllers/category.controller');
//
// router.post('/create', upload.array('eventFileInput', 12), categoryController.events_create);
// router.post('/create', categoryController.ytplayLive_create);
router.get('/getCategories', categoryController.allCategories);
// router.get('/:id', categoryController.ytplayLive_details);
// router.put('/:id/update', categoryController.ytplayLive_update);
// router.delete('/:id/delete', categoryController.ytplayLive_delete);
// router.delete('/drop', categoryController.ytplayLive_collection_drop);


module.exports = router;
