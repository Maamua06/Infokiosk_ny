const mongoose = require('mongoose');

// Model for å sende text string til databasen
const textSchema = mongoose.Schema({
    textInput: {
        type: String,
        // validation for å sjekke om det er en verdi i textInput eller imageInput hvis ikke error
        validate: [
            {
                validator: function(value) {
                    return !(!value && !this.imageInput);
                },
                message: 'Either textInput or imageInput is required.',
            },
        ],
    },
    imageInput: {
        type: String,
        validate: [
            {
                validator: function(value) {
                    return !(!value && !this.textInput);
                },
                message: 'Either textInput or imageInput is required.',
            },
        ],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Text = mongoose.model('Text', textSchema);

module.exports = Text;
