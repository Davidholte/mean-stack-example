// get database connection via mongoose
var mongoose = require('mongoose');

// Exports to server.js
module.exports = mongoose.model('Item', {
    name: {
        type: String,
        default: 'anonymous'
    },
    text: {
        type: String,
        default: ''
    }
});