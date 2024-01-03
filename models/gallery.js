const mongoose = require('mongoose')

const gallerySchema = new mongoose.Schema({
    domain: {
        type: String,
        index: true
    },
    image:[{
        _id: {
            type: mongoose.Schema.Types.ObjectId, auto: true 
        },
        foldername: String,
        newimagename: String
    }],
    foldertype: [{
        name:{
            type: String,
            unique: true
        },
        path: {
            type: String,
            unique: true
        }
    }],
    principal:{
        type:String
    },
    secretary:{
        type:String
    },
    director:{
        type:String
    },
    incharge:{
        type:String
    },
    logo:{
        type:String
    }


})

const Gallery = mongoose.model('gallery', gallerySchema)

module.exports = Gallery