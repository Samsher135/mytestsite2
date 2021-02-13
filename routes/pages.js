const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.render('Book1');
});

module.exports = router;