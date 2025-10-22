const express = require("express");
const UsersController = require("../Controllers/UsersController");
const router = express.Router();


router.post("/register",UsersController.register);

router.get(`/`, (req, res)=>{
    res.send("User ");
})



module.exports = router;