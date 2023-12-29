const express = require('express')
// const {blankEjsLayout } = require('../middlewares/default')
const { viewEngine } = require('../middlewares/default')
const { mainpage, clearnavigation, otherpage, subpage } = require('../controllers/public')

const app = express()

viewEngine(app)

// Middleware to intercept favicon requests
app.use('/favicon.ico', (req, res) => res.status(204));

app.route('/clear-navigation').get(clearnavigation)
// Route definitions
app.get('/', mainpage);
app.get('/:id', otherpage); 
app.get('/:id/:subid', subpage); 

module.exports = app