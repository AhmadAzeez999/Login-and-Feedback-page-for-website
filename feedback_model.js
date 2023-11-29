const mongoose = require('mongoose');
const feedback_schema = mongoose.Schema({

    from: {
        type: String,
        required: [true, "The sender email-id is required"]
    },

    feedback: {
        type: String,
        required: [true, "The feedback message is required"]
    }
});

const feedback_modal = mongoose.model('feedbacks', feedback_schema);

module.exports = feedback_modal;