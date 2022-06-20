const fs = require("fs");
const uuid = require("uuid").v1;
const util = require("util"); // these are requirements to complete what is done in storage.

const writeFile = util.promisify(fs.writeFile); // writes and reads the file
const readFile = util.promisify(fs.readFile);

class Storage { // setting up the storage object
    read() {
        return readFile("db/db.json", "utf8")
    }
    write(note) {
        return writeFile("db/db.json", JSON.stringify(note))
    }

    addNote(note) {
        const { title, text } = note

        if (!title || !text) {
            throw new Error("title and text cannot be blank")
        }

        const newNote = { title, text, id: uuid() }

        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => this.newNote)
    }

    getNotes() {
        return this.read()
            .then(notes => {
                return JSON.parse(notes) || [];
            })
    }
    removeNote(id) {
        return this.getNotes()
            .then(notes => notes.filter(note => note.id !== id))
            .then(keptNotes => this.write(keptNotes))
    }
}

module.exports = new Storage();