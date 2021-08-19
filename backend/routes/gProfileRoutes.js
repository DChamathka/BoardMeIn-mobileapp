const express = require('express');
const router = express.Router();
const {
  getGuestById,
  updateGuestPic,
  updateGuestUName,
  updateGuestBio,
  updateGuestLocation,
  updatePassword,
} = require('../controllers/guestProfileCtrl');

router.get("/:id", getGuestById);
router.put("/updatepic/:id", updateGuestPic);
router.put("/username/:id", updateGuestUName);
router.put("/bio/:id",updateGuestBio);
router.put("/location/:id",updateGuestLocation);
router.put("/password/:id",updatePassword);

module.exports = router;