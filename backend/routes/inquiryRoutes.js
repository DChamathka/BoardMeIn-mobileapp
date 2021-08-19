const router = require("express").Router();
const inquiryServices = require("../controllers/inquiryCtrl");

//to create
router.post("/inquiry", async (req, res) => {
  await inquiryServices.createInquiry(req, res);
});

//to update
router.put("/inquiry/:inquiryId", async (req, res) => {
  await inquiryServices.updateAInquiry(req, res);
});

//to delete
router.delete("/inquiry/:inquiryId", async (req, res) => {
  await inquiryServices.deleteAInquiry(req, res);
});
//to get all
router.get("/inquiry", async (req, res) => {
  await inquiryServices.getAllInquiry(req, res);
});
//to get a single
router.get("/inquiry/:inquiryid", async (req, res) => {
  await inquiryServices.findAInquiry(req, res);
});

router.get("/inquiry/:id", async (req, res)=>{
  await inquiryServices.findUserInquiry(req,res);
})
module.exports = router;