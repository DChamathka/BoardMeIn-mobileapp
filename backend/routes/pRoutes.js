const express = require('express');
const router = express.Router();

const {
  addProduct,
  getProductsById,
  getProductsByOId,
  updateProduct,
  deleteProducts,
  getProducts,
  getSinglerooms,
  getSharedrooms,
  getHouses,
  getAnnexs,
  getSinRoomCount,
  getShrRoomCount,
  getHouseCount,
  getAnxCount,
} = require('../controllers/productCtrl');

router.post('/addproperty', addProduct);
router.put('/updateproperty/:id', updateProduct);
router.delete('/deleteproperty/:id', deleteProducts);
router.get('/property/:id', getProductsById);
router.get('/ownerproperty/:id', getProductsByOId);
router.get('/properties', getProducts);
router.get('/singlerooms', getSinglerooms);
router.get('/sharedrooms', getSharedrooms);
router.get('/houses', getHouses);
router.get('/annexes', getAnnexs);
router.get('/sroom', getSinRoomCount);
router.get('/shroom', getShrRoomCount);
router.get('/house', getHouseCount);
router.get('/annex', getAnxCount);

module.exports = router;