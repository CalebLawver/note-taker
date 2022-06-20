const path = require('path');
const router = require('express').Router();

router.get('/notes', function(req, res) { // dictates where the notes are saved and will pull from there.
    res.sendFile(path.join(__dirname, '../Develop/public/notes.html'));
});

router.get('*', function(req, res) { // is the main page to the website, 'landing page'
    res.sendFile(path.join(__dirname, '../Develop/public/index.html'));
});

module.exports = router;
