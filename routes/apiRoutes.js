const router = require('express').Router(); // express router allows for cleaner routes
const storage = require('../db/storage'); //tells doc where to save data.

router.get('/notes', (req, res) => { // this route will get any notes stored in /db/storage.
    storage
        .getNotes() // calls on getNotes in storage
        .then(notes => { // takes notes and shows them.
            res.json(notes)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.post('/notes', (req, res) => { // This route adds notes
    console.log(req.body) 
    storage
        .addNote(req.body) // calls on addNote in storage
        .then(note => {
            res.json(note) 
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.delete('/notes/:id', (req, res) => { // this route deletes notes
    storage
        .removeNote(req.params.id) // calls on the removeNote with the ID of the note in storage.
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(500).json(err))
})

module.exports = router;