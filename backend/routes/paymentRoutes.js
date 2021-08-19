const express = require("express");

const router = express.Router();

const paymenttController = require("../controllers/paymentCtrl");

router.post("/payment/", paymenttController.savePayment);

module.exports = router;           