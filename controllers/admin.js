const Gallery = require("../models/gallery");
const MainPage = require("../models/home_page");
const MetaData = require("../models/meta_data")

const adminDashboardPage = async (req,res)=>{
    // console.log(req.session.metadata);
    res.render('admin/dashboard')
}

const adminLoginSubmit = async (req,res)=>{
    const payload = req.body;
    const metaResponse = await MetaData.create(payload)

    res.json(response)
}

const createNewSitePage = async (req,res)=>{
    res.render('admin/create-site')
}

const createNewSiteWidget = async (req,res)=>{
    res.render('admin/create-widget')
}

const editCollegeData = async (req,res)=>{
    const collegeid = req.params.id;
    const meta_data = await MetaData.findById(collegeid)
    const home_page_data = await MainPage.findOne({meta_model_id:collegeid})
    // return res.json(meta_data)
    res.render('admin/create-site', {
        college: collegeid,
        meta_data: meta_data,
        home_data: home_page_data
    })
}



const updateCollegeData = async (req,res)=>{
    const collegeid = req.params.id
    const body = req.body
    
    
    // console.log(collegeid);
    // console.log(body);

    const meta_payload = {
        collegename: body.collegename,
        domain: body.domain,
        principal : body.principal,
        user:{
            username: body.username, 
            password: body.password
        },
        collegedata: {
            tagline: body.tagline,
            address: body.address,
            phone1: body.phone1,
            phone2: body.phone2,
            email1: body.email1, 
            email2: body.email2
        }
    }

    const updateMetaData = await MetaData.findByIdAndUpdate(collegeid, meta_payload)

    const main_page_payload = {
        title: body.title,
        domain: body.domain,
        notice:{
            caption: body.noticeheading
        },
        importantlink:{
            caption: body.importantlinkheading
        },
        aboutcollege:{
            caption: body.aboutcollegeheading,
            content: body.aboutcollegecontent
        },
        principaldesk:{
            caption: body.principaldeskheading,
            content: body.principaldeskcontent,
            // imagepath: body.principaldeskpath
        },
        section1:{
            caption: body.section1heading,
            content: body.section1content
        },
        section2: {
            caption: body.section2heading,
            content: body.section2content
        },
        meta_model_id: updateMetaData._id
    }

        const condition = {domain: body.domain,}
        const updateMainPage = await MainPage.updateOne(condition, main_page_payload)


        res.redirect('/admin')
    // console.log({updateMainPage,updateMetaData});

    // res.json({updateMainPage,updateMetaData})
}

const addCollege = async (req,res)=>{
    const body = req.body;
    payload = {
        collegename: body.collegename,
        domain: body.domain,
        user:{
            username: body.username,
            password: body.password,
        },
        helpline: body.helpline,
        principal: body.principal
    }

    const mainpage_payload = {domain: req.body.domain}
    await MainPage.create(mainpage_payload)

    // console.log(payload);
    await MetaData.create(payload)
    await Gallery.create(payload)
    
    // Fetch all college data from database
    await MetaData.find({}).select('_id domain collegename').then(result => {
        console.log(result);
        // res.json(result)
        req.session.metadata = result
        console.log(req.session.metadata);
    }).catch(err => {
        console.error(err);
        res.send(err);
    });

    res.redirect('/admin')
}

module.exports = {adminDashboardPage, adminLoginSubmit, createNewSitePage, createNewSiteWidget, editCollegeData, addCollege, updateCollegeData}