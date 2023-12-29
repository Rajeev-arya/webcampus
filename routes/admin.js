const express = require('express')
const { adminDashboardPage, adminLoginSubmit, createNewSitePage, createNewSiteWidget, editCollegeData, addCollege, updateCollegeData } = require('../controllers/admin')
const { adminEjsLayout } = require('../middlewares/default')
const { adminLogout } = require('../controllers/login')
const app = express()


adminEjsLayout(app)

app.route('/').get(adminDashboardPage).post(adminLoginSubmit)
app.route('/create-new').get(createNewSitePage)
app.route('/college/:id').get(editCollegeData)
app.route('/create-new-widget').get(createNewSiteWidget)
app.route('/add-college').post(addCollege)
app.route('/update-college-data/:id').post(updateCollegeData)
app.route('/logout').get(adminLogout)


module.exports = app