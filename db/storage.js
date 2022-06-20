const fs = require("fs");
const uuid = require("uuid").v1;
const util = require("util"); // these are requirements to complete what is done in storage.

const writeFile = util.promisify(fs.writeFile); // writes and reads the file
const readFile = util.promisify(fs.readFile);

class Storage { // setting up the storage object, functions inside this object will apply to the object
    read() {
        return readFile("db/db.json", "utf8")
    }
    write(note) {
        return writeFile("db/db.json", JSON.stringify(note))
    }

    addNote(note) { // adding new notes
        const { title, text } = note // setting up items to change within the note

        if (!title || !text) {
            throw new Error("title and text cannot be blank")
        }

        const newNote = { title, text, id: uuid() } // gives the newNote a unique id

        return this.getNotes() // will update the notes side bar
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => this.newNote)
    }

    getNotes() { // shows current notes
        return this.read()
            .then(notes => {
                return JSON.parse(notes) || [];
            })
    }
    
    removeNote(id) { // deletes a note 
        return this.getNotes()
            .then(notes => notes.filter(note => note.id !== id))
            .then(keptNotes => this.write(keptNotes))
    }
}

module.exports = new Storage();