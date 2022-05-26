const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const saveImg  = require('../middleware/multer-config');
const saucesCtrl = require('../controllers/sauces');

router.post('/', saveImg.saveImg, saucesCtrl.createSauce);
router.get('/', saucesCtrl.saveImg.getAllSauces);
router.put('/:id', saveImg, saucesCtrl.modifySauce);
router.get('/:id', saucesCtrl.getOneSauce);
router.delete('/:id', saucesCtrl.deleteOneSauce);
router.post('/:id/like', saucesCtrl.likeSauce);


module.exports = router;
