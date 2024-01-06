const express = require('express')
const path = require('path')
const ejsLayout = require('express-ejs-layouts')
const session = require('express-session');
const cookies = require('cookie-parser')
const MongoStore = require('connect-mongo')
const compression = require('compression')

const rooturl = path.resolve(__dirname, '..')
// const staticFolderPath = path.join(pathurl, 'public')

const gzipcompressior = (app)=>{
    app.use(compression())
}

const bodyParser = (app) =>{
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
}

const viewEngine = (app)=>{
    const viewEnginePath = path.join(rooturl, 'public')
    app.set('view engine', 'ejs')
    app.set('views', viewEnginePath)

    //Set  Ejs layout
    app.use(ejsLayout)
    const ejsLayoutPath = path.join(rooturl, 'layouts/layout')
    console.log(ejsLayout);
    
    // Specify the layout file (layout.ejs) in the 'layouts' directory
    app.set('layout', ejsLayoutPath);

}

const adminEjsLayout = (app)=>{
    
    const viewEnginePath = path.join(rooturl, 'public')
    app.set('view engine', 'ejs')
    app.set('views', viewEnginePath)

    //Set  Ejs layout
    app.use(ejsLayout)
    const ejsLayoutPath = path.join(rooturl, 'layouts/admin')
    
    // Specify the layout file (layout.ejs) in the 'layouts' directory
    app.set('layout', ejsLayoutPath);
}

const managerEjsLayout = (app)=>{
    
    const viewEnginePath = path.join(rooturl, 'public')
    app.set('view engine', 'ejs')
    app.set('views', viewEnginePath)

    //Set  Ejs layout
    app.use(ejsLayout)
    const ejsLayoutPath = path.join(rooturl, 'layouts/manager')
    
    // Specify the layout file (layout.ejs) in the 'layouts' directory
    app.set('layout', ejsLayoutPath);
}

const blankEjsLayout = (app)=>{
    
    const viewEnginePath = path.join(rooturl, 'public')
    app.set('view engine', 'ejs')
    app.set('views', viewEnginePath)

    //Set  Ejs layout
    app.use(ejsLayout)
    const ejsLayoutPath = path.join(rooturl, 'layouts/blank')
    
    // Specify the layout file (layout.ejs) in the 'layouts' directory
    app.set('layout', ejsLayoutPath);
}

const staticPath = (app)=>{
    const staticPath = path.join(rooturl, 'assets')
    app.use('/assets',express.static(staticPath))
}

const nodeModulePath = (app)=>{
    const staticPath = path.join(rooturl, 'node_modules')
    app.use('/node_modules',express.static(staticPath))
}

const staticImagePath = (app)=>{
    const staticPath = path.join(rooturl, 'images')
    app.use('/images',express.static(staticPath))
}

const staticServerImagePath = (app)=>{
    const staticPath = path.join(rooturl, 'static')
    app.use('/images',express.static(staticPath))
}

const sessionManager = (app, key)=>{
    const MONGO_PATH = process.env.DATABASE_URL
    app.use(session({
        secret: key,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl: MONGO_PATH }),
        cookie: { secure: false }, // Adjust this based on your environment
    }))
}

const cookieParser = (app)=>{
    app.use(cookies())
}

module.exports = {
    bodyParser, 
    viewEngine, 
    staticPath, 
    adminEjsLayout, 
    blankEjsLayout, 
    sessionManager, 
    cookieParser, 
    managerEjsLayout,
    nodeModulePath,
    staticImagePath,
    gzipcompressior, staticServerImagePath
}
