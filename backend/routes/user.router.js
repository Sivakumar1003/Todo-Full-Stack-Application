const express = require('express');
const { getAllUser, getSingleUser, addUser } = require('../controler/user.controler');
const router = express.Router();

router.route("/AllUsers").get(getAllUser);
router.route("/Login/:id").get(getSingleUser);
router.route("/Signup").post(addUser);

module.exports = router;