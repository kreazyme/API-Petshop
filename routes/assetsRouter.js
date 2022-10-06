var express = require('express');
var router = express.Router();
const assetsController = require('../controllers/assetsController');
router.use(express.json());

// add status
router.post('/', assetsController.AddAssets);
router.get('/:id', assetsController.getAsset);
router.put('/:id', assetsController.updateAssets);
router.delete('/:id', assetsController.deleteAssets);

module.exports = router;