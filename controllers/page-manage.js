const Page = require("../models/pages")

const pageCreatorPage = async (req, res)=>{
    const pageid = req.params.id

    const payload = {pageid, content: ''}

    let response = await Page.findOne({pageid})

    if (!response) {
        response = await Page.create(payload)
    }


    res.render('manager/page-creator', {data : response})
}

const pageCreator = async (req,res)=>{
    const pageid = req.params.id
    const payload = {
        pageid : pageid,
        content : req.body.editor
    }

    await Page.findOneAndUpdate({pageid}, payload)
    const response = await Page.findOne({pageid})
    
    res.render('manager/page-creator', {data : response})

}

module.exports = {pageCreatorPage, pageCreator}