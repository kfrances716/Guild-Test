const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    content: String,
    author: String,
    created_at: Date,
});

const userSchema = new Schema({
    user: { type: String, unique: true },
    messages: [messageSchema],
}, { optimisticConcurrency: true });

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;