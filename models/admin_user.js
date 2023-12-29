// adminUserModel.js

const mongoose = require('mongoose');

const adminUserSchema = new mongoose.Schema({
  adminid: String,
  username: {type: String},
  password: {type: String},
  theme: {
    colourpallet: [
      {
        name:String,
        textdark: String,
        bgdark: String,
        textlight: String,
        bglight: String,
        main: String,
      }
    ],
    type: {
      type: String, // 'custom' or 'default'
    },
    defaultLayout: [
      {
        template1: String,
        template2: String,
        template3: String,
        template4: String,
      },
    ],
    custom: {
      header: [
        { headername: String },
      ],
      body: [
        { bodyname: String }
      ],
      footer: [
        { footername: String },
      ],
    },
  },
});

const AdminUser = mongoose.model('AdminUser', adminUserSchema);

module.exports = AdminUser;
