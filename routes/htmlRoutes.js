const path = require('path');

const router = require('express').Router();


router.get('/notes', function(req, res) {
    response.sendFile(path.join(__dirname, '../Develop/public/notes.html'));
});

router.get('*', function(req, res) {
    response.sendFile(path.join(__dirname, '../Develop/public/index.html'));
});

module.exports = router;
