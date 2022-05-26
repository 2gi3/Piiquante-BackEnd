const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const rs saveImg  = require('../middleware/multer-config');
const saucesCtrl = require('../controllers/sauces');

router.post('/', saveImg, saucesCtrl.createSauce);
router.get('/', saucesCtrl.getAllSauces);
router.put('/:id', saveImg, saucesCtrl.modifySauce);
router.get('/:id', saucesCtrl.getOneSauce);
router.delete('/:id', saucesCtrl.deleteOneSauce);
router.post('/:id/like', saucesCtrl.likeSauce);


module.exports = router;
