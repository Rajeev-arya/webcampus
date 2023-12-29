const express = require('express')
const {blankEjsLayout } = require('../middlewares/default')
const {verifyAdmin, adminPage, verifyManager, managerLoginPage} = require('../controllers/login')
const app = express()

blankEjsLayout(app)

app.route('/').get(adminPage).post(verifyAdmin)

app.route('/manager').get(managerLoginPage).post(verifyManager)


module.exports = app