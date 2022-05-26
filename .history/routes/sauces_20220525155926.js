const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const saucesCtrl = require('../controllers/sauces');

  router.post('/',auth, multer, saucesCtrl.createSauce);  
  router.get('/', saucesCtrl.getAllSauces);
  router.put('/:id', multer, saucesCtrl.modifySauce);
  router.get('/:id', saucesCtrl.getOneSauce);
  router.delete('/:id', saucesCtrl.deleteOneSauce);
  router.post('/:id/like', saucesCtrl.likeSauce);


module.exports = router;
