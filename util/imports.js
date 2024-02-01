const express = require('express')
const dotenv = require('dotenv')
const database = require('./database')
const { bodyParser, viewEngine, staticPath, sessionManager, cookieParser, nodeModulePath, staticImagePath, gzipcompressior, staticServerImagePath } = require('../middlewares/default')

dotenv.config()
const PORT = process.env.PORT
const URL = process.env.DATABASE_URL
const SESSION_KEY = process.env.SESSION_KEY
const SERVER = process.env.SERVER

const expressMiddleware = (app)=>{
    // gzipcompressior(app)
    bodyParser(app)
    viewEngine(app)
    staticPath(app)
    sessionManager(app, SESSION_KEY)
    cookieParser(app)
    nodeModulePath(app)
    // staticServerImagePath(app)
    if (SERVER == 'PROD') {
        staticServerImagePath(app)
    } else {
        staticImagePath(app)
    }
}

module.exports = {
    PORT,
    URL,
    express,
    expressMiddleware,
    database
}