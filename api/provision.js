const express = require("express");
const router = express.Router();



// @route   POST api/provision
// @desc    render page
// @access  Public
router.post("/", (req, res) => {
    res.sendFile('public/provision.html');
});

// @route   GET api/climate/all
// @desc    Return all climate data
// @access  Public


module.exports = router;