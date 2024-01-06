const Gallery = require("../models/gallery")
const MainPage = require("../models/home_page")
const MetaData = require("../models/meta_data")
const Page = require("../models/pages")
const dotenv = require('dotenv')
const { hostname } = require("../util/public")
dotenv.config()
const IP = process.env.IP
const TEST_DOMAIN = process.env.TEST_DOMAIN
const SERVER = process.env.SERVER

// const domain = TEST_DOMAIN

const mainpage = async (req,res)=>{

  const domain = hostname(SERVER, TEST_DOMAIN, req)

  if (domain == IP) {
    return res.render('webcampus', { layout: false })
  }

    const metadata = await MetaData.findOne({domain})
    console.log(metadata);
    const homedata = await MainPage.findOne({domain})
    const slider = await Gallery.findOne({domain})
    res.render('index', {metadata, homedata, slider})
}

const otherpage = async (req,res)=>{

  // Condition for webcampus.in site
  const domain = hostname(SERVER, TEST_DOMAIN, req)

  if (domain == IP) {
    const id = req.params.id
    if (id) {
      return res.render('webcampus-404', { layout: false })
    }
    return res.render('webcampus', { layout: false })
  }

  const metadata = await MetaData.findOne({domain})

  const id = req.params.id
  console.log(id);
  // console.log(id);
  if (id == 'gallery') {
    const gallery = await Gallery.findOne({domain})
    return res.render('gallery-page', {metadata, data:gallery})
    
  }else if(id == '' || id == 'favicon.ico'){
    const homedata = await MainPage.findOne({domain})
    const slider = await Gallery.findOne({domain})
    return res.render('index', {metadata: metadata,homedata, slider})

  }else{
          const result = await MetaData.aggregate([
              {
                $match: {
                  'navigationbar.href': id,
                  domain:domain
                }
              },
              {
                $unwind: '$navigationbar'
              },
              {
                $match: {
                  'navigationbar.href': id
                }
              },
              {
                $project: {
                  _id: '$navigationbar._id'
                }
              }
            ])
        let pageid = result[0]._id
        const response = await Page.find({pageid})
            if (response[0] == undefined) {
                const metadata = await MetaData.findOne({domain})
                const homedata = await MainPage.findOne({domain})
                const slider = await Gallery.findOne({domain})
                return res.render('404', {metadata: metadata,homedata, slider})
            }
            
            const slider = await Gallery.findOne({domain})
            // console.log(response[0]);
        const payload = response[0].content
        res.render('dynamic-page', {data: payload, metadata, slider})
  }
}

const subpage = async (req,res)=>{

  const domain = hostname(SERVER, TEST_DOMAIN, req)

  // const domain = 'webcampus.in'

  if (domain == IP) {
    const subid = req.params.subid
    if (subid) {
      return res.render('webcampus-404', { layout: false })
    }
    return res.render('webcampus', { layout: false })

  }
  
  const metadata = await MetaData.findOne({domain})
  const desiredNavLinkHref = req.params.id;
  const desiredNestedNavLinkHref = req.params.subid;
  const desiredDomain = domain; 
  
  try {
    const result = await MetaData.findOne(
      {
        'domain': desiredDomain,
        'navigationbar.href': desiredNavLinkHref,
        'navigationbar.dropdown.href': desiredNestedNavLinkHref
      },
      'navigationbar'
    );
  
    if (result) {
      // Filter the navigationbar array in your code to get the desired ID
      const matchingNavItem = result.navigationbar.find(item =>
        item.href === desiredNavLinkHref &&
        item.dropdown.some(subitem => subitem.href === desiredNestedNavLinkHref)
      );
  
      if (matchingNavItem) {
        const id = matchingNavItem.dropdown.find(subitem => subitem.href === desiredNestedNavLinkHref)._id;
        
        // check for page 
        const response = await Page.find({pageid:id})
        if (response[0] == undefined) {
            const metadata = await MetaData.findOne({domain})
            const homedata = await MainPage.findOne({domain})
            const slider = await Gallery.findOne({domain})
            return res.render('404', {metadata: metadata,homedata, slider})
        }
        const payload = response[0].content
        const slider = await Gallery.findOne({domain})

        return res.render('dynamic-page', {data: payload, metadata, slider})
        // console.log('Found ID:', id);
      } else {
        console.log('No matching document found.');
      }
    } else {
      console.log('No matching document found.');
    }
  } catch (err) {
    console.error(err);
  }

}

const clearnavigation = async (req,res)=>{

    const condition = { domain: domain }
    const update = { $set: { navigationbar: {}} }
    
    const result = await MetaData.updateOne(condition, update);

    res.json(result)
}






module.exports = {mainpage, clearnavigation, otherpage, subpage}