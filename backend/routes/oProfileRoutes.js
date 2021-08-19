const express = require('express');
const router = express.Router();

const {
  getOwnerById,
  updateOwnerPic,
  updateOwnerUName,
  updateOwnerBio,
  updateOwnerLocation,
  updatePassword,
} = require('../controllers/ownerProfileCtrl');

router.get("/:id", getOwnerById);
router.put("/ownerupdatepic/:id", updateOwnerPic);
router.put("/ownerusername/:id", updateOwnerUName);
router.put("/ownerbio/:id",updateOwnerBio);
router.put("/ownerlocation/:id",updateOwnerLocation);
router.put("/ownerpassword/:id",updatePassword);

module.exports = router;