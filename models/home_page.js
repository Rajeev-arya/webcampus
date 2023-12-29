const mongoose = require('mongoose');

// Define the schema
const MainPageSchema = new mongoose.Schema({
  id: String,
  title: String,
  domain: String,
  marquee: {
    active: Boolean,
    content: String
  },
  slider: [
    {
      originalname: String,
      newimagename: String,
      imgALT: String,
    }
  ],
  modal: {
    caption: String,
    content: String
  },
  notice: {
    caption: String,
    content:[{
        caption: String,
        filepath: String,
        date: String
    }]
  },
  news: {
    caption: String,
    content:[{
        caption: String,
        filepath: String,
        date: String
    }]
  },
  importantlink: {
    caption: String,
    content: [{
      faicon: String,
      heading: String,
      href: String
        }]
    },
  aboutcollege: {
    caption: String,
    content: String
  },
  principaldesk: {
    caption: String,
    imagepath: String,
    content: String
  },
  section1: {
    caption: String,
    content: String
  },
  section2: {
    caption: String,
    content: String
  },
  meta_model_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MainPage'
  }
});

// Create the model
const MainPage = mongoose.model('MainPage', MainPageSchema);

module.exports = MainPage;
