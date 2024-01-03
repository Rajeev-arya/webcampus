const mongoose = require('mongoose');
const MainPage = require('./home_page');


// Define the schema
const metaDataSchema = new mongoose.Schema({
    id: String,
    collegename: String,
    domain: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    principal:{
        type: String
    },
    helpline: {
        type: String
    },
    user: {
        username: String,
        password: String
    },
    themecolor: {
        themecolorid: String,
        themecolor: String,
        textdark: String,
        bgdark: String,
        textlight: String,
        bglight: String,
        main: String
    },
    collegedata: {
        tagline: String,
        address: String,
        principal: String,
        phone1: String,
        phone2: String,
        email1: String,
        email2: String
    },
    templatedesign: {
        header: String,
        navigation: String,
        footer: String,
        mainPage: String,
        body: String
    },
    navigationbar: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId, auto: true 
            },
            text: String,
            href: String,
            itemtype: String,
            dropdown: [
                { 
                    _id: {
                        type: mongoose.Schema.Types.ObjectId, auto: true 
                    },
                    text: String, 
                    href: String 
                }
            ]
        }
    ],
    footer: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId, auto: true 
            },
            text: String,
            href: String,
            itemtype: String,
            dropdown: [
                { 
                    _id: {
                        type: mongoose.Schema.Types.ObjectId, auto: true 
                    },
                    text: String, 
                    href: String 
                }
            ]
        }
    ],
},
{
    timestamps:true
});

// Define the model
const MetaData = mongoose.model('MetaData', metaDataSchema);

module.exports = MetaData;
