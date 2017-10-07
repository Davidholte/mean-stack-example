// get database connection via mongoose
var mongoose = require('mongoose');

// Exports to server.js
module.exports = mongoose.model('Item', {
    text: {
        type: String,
        default: ''
    }
});