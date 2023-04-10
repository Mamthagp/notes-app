const Note = require('../models/note')

const notesCltr = {}

notesCltr.list = (req, res) => {
    const { id } = req.user
    Note.find({userId : id})
        .then((notes) => {
            res.json(notes)
        })
        .catch((err) => {
            res.json(err)
        })
}

notesCltr.create = (req, res) => {
    const body = req.body
    const note = new Note(body)
    note.userId = req.user.id
    note.save()
        .then((note) => {
            res.json(note)
        })
        .catch((err) => {
            res.json(err)
        })
}

notesCltr.show = (req, res) => {
    const id = req.params.id
    Note.findOne({_id: id, userId : req.user.id })
        .then((note) => {
            res.json(note)
        })
        .catch((err) => {
            res.json(err)
        })
}

notesCltr.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Note.findOneAndUpdate({_id : id, userId : req.user.id}, body, {new : true, runValidators : true })
        .then((note) => {
            res.json(note)
        })
        .catch((err) => {
            res.json(err)
        })
}

notesCltr.destroy = (req, res) => {
    const id = req.params.id
    const { id: userId } = req.user
    Note.findOneAndDelete({_id: id, userId : userId})
        .then((note) => {
            res.json(note)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = notesCltr