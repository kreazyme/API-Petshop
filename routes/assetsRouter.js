const express = require('express');
const router = express.Router();
const assetsController =  require('../controllers/assetsController');
router.use(express.json());

router.post('/',assetsController.addAAssets);
router.get('/:id', assetsController.getAAssets);
router.put('/:id', assetsController.updateAssets);
router.delete('/:id',assetsController.deleteAssets);

module.exports = router;