const mongoose = require('mongoose')

const { Schema } = mongoose

const noteSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    noteDate: {
        type: String,
        default: () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
          },
        required: true
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
}, {timestamps: true})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note