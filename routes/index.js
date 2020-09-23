'use strict';

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.redirect('/users/login')
})

module.exports = router;