const mongoose = require('mongoose')

const gallerySchema = new mongoose.Schema({
    domain: String,
    image:[{
        foldername: String,
        // originalname: String,
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