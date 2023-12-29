const mongoose = require('mongoose')

const pageSchema = new mongoose.Schema({
    pageid: {
        type: String,
        unique: true,
        required: true
    },
    content: {
        type: String
    }
})

const Page = mongoose.model('page', pageSchema)

module.exports = Page