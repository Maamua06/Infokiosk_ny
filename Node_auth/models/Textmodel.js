const mongoose = require('mongoose');

// model for å sende text string til databasen
const textSchema = mongoose.Schema({

    textInput: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Text = mongoose.model('Text', textSchema);

module.exports = Text;