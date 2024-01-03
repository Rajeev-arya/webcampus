const express = require('express')
const dotenv = require('dotenv')
const database = require('./database')
const { bodyParser, viewEngine, staticPath, sessionManager, cookieParser, nodeModulePath, staticImagePath, gzipcompressior } = require('../middlewares/default')

dotenv.config()
const PORT = process.env.PORT
const URL = process.env.DATABASE_URL
const SESSION_KEY = process.env.SESSION_KEY

const expressMiddleware = (app)=>{
    gzipcompressior(app)
    bodyParser(app)
    viewEngine(app)
    staticPath(app)
    sessionManager(app, SESSION_KEY)
    cookieParser(app),
    staticImagePath(app),
    nodeModulePath(app)
}

module.exports = {
    PORT,
    URL,
    express,
    expressMiddleware,
    database
}