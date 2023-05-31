const express=require('express');
const router = express.Router();
const {getcontact,createcontact,updatecontact,deletecontact,showcontact}=require("../controllers/contact_controller");
const validateToken = require('../middleware/validateTokenHandler');


router.use(validateToken);
router.route("/").get(getcontact).post(createcontact)
router.route("/:id").put(updatecontact).delete(deletecontact).get(showcontact)
module.exports=router;