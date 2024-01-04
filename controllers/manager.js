const AdminUser = require("../models/admin_user")
const Gallery = require("../models/gallery")
const MainPage = require("../models/home_page")
const MetaData = require("../models/meta_data")
const mongoose = require('mongoose')



// const domain = req.session.metadata.domain

async function managerDashboard(req,res) {

    const domain = req.session.metadata.domain

    const response = await MainPage.findOne({'domain': domain}).select('notice news importantlink').then(result=>{
        return result
    }).catch(err=>{
        console.error(err)
    })

    // Get the count of total images in gallery including documents
    let count = await Gallery.aggregate([
        { $match: { domain: domain} },
        {
          $project: {
            numberOfImages: { $size: '$image' }
          }
        }
      ]);

      count = count[0].numberOfImages


    res.render('manager/dashboard',{ count, data: response})
}


const widgetPage = (req,res)=>{
    res.render('manager/widgets/importantlink/add')
}


    // Important Link
    const importantLinkPage = async (req,res)=>{

        const domain = req.session.metadata.domain

        const response = await MainPage.findOne({'domain': domain}).select('importantlink').then(result=>{
            return result
        }).catch(err=>{
            console.error(err)
        })
        console.log(response.importantlink);
        res.render('manager/widgets/add-link', {data:response.importantlink.content})
        // res.json(response)
    }

    const addImportantLink = async (req,res)=>{
        const body = req.body;
        const payload = {
            faicon: body.faicon,
            href: body.href,
            heading: body.heading
        }

        const domain = req.session.metadata.domain

        
        const result = await MainPage.findOneAndUpdate(
            { domain: domain },
            { $push: { 'importantlink.content': payload } },
            { new: true }
        );
        res.redirect('add-link')
    }

    const deleteImportantLink = async (req,res)=>{
        const idtodelete = req.params.id
        domain = req.session.metadata.domain

        // Define an asynchronous function to delete the important link
        async function deleteImportantLink() {
            try {
            // Update the document to remove the important link by ID and domain using await
            const result = await MainPage.findOneAndUpdate(
                {
                'importantlink.content._id': idtodelete,
                'domain': domain,
                },
                { $pull: { 'importantlink.content': { '_id': idtodelete } } },
                {new: true}
            );

      res.redirect('/manager/add-link')
  
    } catch (error) {
      console.error(error);
    } 
  }
                
        deleteImportantLink();
                

            
    }

    // Navigation Page controllers

    const navigationPage = async(req,res)=>{

        const domain = req.session.metadata.domain
    
        const response = await MetaData.findOne({'domain': domain}).select('navigationbar').then(result=>{
            return result
        }).catch(err=>{
            console.error(err)
        })
        console.log(response);
        res.render('manager/widgets/add-nav', {data:response})
    }

    const addNavigationItem = async(req,res)=>{

        const body = req.body
        const domain = req.session.metadata.domain

        if (!body.itemtype) {
            body.itemtype = 'simple'
        }
        const payload = {
            _id: new mongoose.Types.ObjectId(),
            text: body.itemname,
            href: body.link,
            itemtype: body.itemtype
        }

        const result = await MetaData.findOneAndUpdate(
            { domain: domain },
            { $push: { 'navigationbar': payload } },
            { new: true }
        );

            // Fetch all college data from database
                await MetaData.findOne({domain}).select('_id user domain navigationbar').then(result=>{
                    console.log(result);
                    req.session.metadata = result
                    })
                    .catch(err => {
                        console.error(err);
                        res.send(err);
                    });

        await res.redirect('add-navigation')
    }

    const addNavigationSubItem = async(req,res)=>{

        const domain = req.session.metadata.domain
        const navitemid = req.params.id
        const body = req.body
    
        // Function to add navigationbar item by domain and ID
    
        const payload = [{
            _id: new mongoose.Types.ObjectId(),
            text: body.itemname,
            href: body.link
        }]

        await MetaData.findOneAndUpdate({
            domain:domain,
            'navigationbar._id': navitemid
        },
            {
                $push: {
                  'navigationbar.$.dropdown': {
                    $each: payload,
                  },
                },
              },
            )
            
        
            // Refresh Side Navigation Pages Section
            await MetaData.findOne({domain}).select('_id user domain navigationbar').then(result=>{
                console.log(result);
                req.session.metadata = result
                })
                .catch(err => {
                    console.error(err);
                    res.send(err);
                });

        await res.redirect('/manager/add-navigation')
    }
    
    const deleteSubNavitem = async(req,res)=>{

        const domain = req.session.metadata.domain
        const subitemid = req.params.subid
        const navitemid = req.params.id

        // Function to delete a navigationbar item by domain and ID
            const deleteNavigationBarSubItem = async (domain, navitemid, subitemid) => {
                try {
                    const result = await MetaData.findOneAndUpdate(
                        { domain: domain, 'navigationbar._id': navitemid },
                        { $pull: { 'navigationbar.$.dropdown': { _id: subitemid } } },
                        { new: true } // To return the modified document
                    );

                    
                // Refresh Side Navigation Pages Section
                await MetaData.findOne({domain}).select('user domain navigationbar').then(result=>{
                    console.log(result);
                    req.session.metadata = result
                    })
                    .catch(err => {
                        console.error(err);
                        res.send(err);
                    });

                    // Select the updated navigation bar and return to page
                    await res.redirect('/manager/add-navigation')
                    
                } catch (error) {
                    console.error(error);
                }
            };

            deleteNavigationBarSubItem(domain, navitemid, subitemid);
    }

    const deleteNavitem = async(req,res)=>{

        const domain = req.session.metadata.domain
        const idtodelete = req.params.id
    
    
        // Function to delete a navigationbar item by domain and ID
            const deleteNavigationBarItem = async (domain, navigationBarItemId) => {
                try {
                    await MetaData.findOneAndUpdate(
                        { domain: domain },
                        { $pull: { 'navigationbar': { _id: navigationBarItemId } } },
                        { new: true } // To return the modified document
                    );

                    
                    // Refresh Side Navigation Pages Section
                    await MetaData.findOne({domain}).select('user domain navigationbar').then(result=>{
                        console.log(result);
                        req.session.metadata = result
                        })
                        .catch(err => {
                            console.error(err);
                            res.send(err);
                        });
    
                    // Select the updated navigation bar and return to page
                    await res.redirect('/manager/add-navigation')
                    
                } catch (error) {
                    console.error(error);
                }
            };
    
            deleteNavigationBarItem(domain, idtodelete);
    }

    // Footer Page method
    const footerPage = async(req,res)=>{
    
        const domain = req.session.metadata.domain
        const response = await MetaData.findOne({'domain': domain}).select('footer').then(result=>{
            
            return result
        }).catch(err=>{
            console.error(err)
        })
        console.log(response);
        res.render('manager/widgets/add-footer', {data:response})

    }

    const addFooterItem = async(req,res)=>{
        // const
        const body = req.body
        const domain = req.session.metadata.domain
    
        if (!body.itemtype) {
            body.itemtype = 'simple'
        }
        const payload = {
            text: body.itemname,
            href: body.link,
            itemtype: body.itemtype
        }
    
    
        const result = await MetaData.findOneAndUpdate(
            { domain: domain },
            { $push: { 'footer': payload } },
            { new: true }
          );
    
        res.redirect('add-footer')
    }
    
    const addFooterSubItem = async (req,res)=>{
        const sub_nav_id = req.params.id
        const body = req.body
        const domain = req.session.metadata.domain
        const payload = [{
            text: body.itemname,
            href: body.link
        }]

        const response = await MetaData.findOneAndUpdate({
            domain:domain,
            'footer._id': sub_nav_id
        },
            {
                $push: {
                  'footer.$.dropdown': {
                    $each: payload,
                  },
                },
              },
            )
              
        res.redirect('/manager/add-footer')
    
    }

    const deleteFooteritem = async(req,res)=>{

        const domain = req.session.metadata.domain
        const idtodelete = req.params.id
    
    
        // Function to delete a navigationbar item by domain and ID
            const deleteNavigationBarItem = async (domain, navigationBarItemId) => {
                try {
                    await MetaData.findOneAndUpdate(
                        { domain: domain },
                        { $pull: { 'footer': { _id: navigationBarItemId } } },
                        { new: true } // To return the modified document
                    );
    
                    // Select the updated navigation bar and return to page
                    res.redirect('/manager/add-footer')
                    
                } catch (error) {
                    console.error(error);
                }
            };
    
            deleteNavigationBarItem(domain, idtodelete);
    }

    const deleteSubFooterItem = async(req,res)=>{

    const domain = req.session.metadata.domain
    const subitemid = req.params.subid
    const navitemid = req.params.id

    // Function to delete a navigationbar item by domain and ID
        const deleteNavigationBarSubItem = async (domain, navitemid, subitemid) => {
            try {
                const result = await MetaData.findOneAndUpdate(
                    { domain: domain, 'footer._id': navitemid },
                    { $pull: { 'footer.$.dropdown': { _id: subitemid } } },
                    { new: true } // To return the modified document
                );

                // Select the updated navigation bar and return to page
                res.redirect('/manager/add-footer')
                
            } catch (error) {
                console.error(error);
            }
        };

        deleteNavigationBarSubItem(domain, navitemid, subitemid);
    }
      
    // Homepage controllers methods
      
    const mainPage  = async (req,res)=>{
        // console.log(req.session);
        
        const collegeid = req.session.metadata._id;
        const meta_data = await MetaData.findById(collegeid)
        const admin_response = await AdminUser.findOne({adminid: 'adityadesk'})
        const home_page_data = await MainPage.findOne({meta_model_id:collegeid})

        const color_pallet = admin_response.theme.colourpallet

        // return res.json(meta_data)
        // return res.json(home_page_data)
        res.render('manager/main-page', {
            college: collegeid,
            meta_data: meta_data,
            home_data: home_page_data,
            color: color_pallet
        })
    }

    const updateMainPageData = async (req,res)=>{
        const collegeid = req.session.metadata._id
        const body = req.body

        const colorNameToSearch = req.body.themecolor

        let themecolor = await AdminUser.findOne({ 'theme.colourpallet': { $elemMatch: { name: colorNameToSearch } } },
        { 'theme.colourpallet.$': 1 })

        // console.log(colorNameToSearch, themecolor);

        themecolor = themecolor.theme.colourpallet[0]

        // return
        // res.json({message: themecolor})
        
        const meta_payload = {
            collegename: body.collegename,
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
            },
            themecolor: {
                themecolorid: themecolor._id,
                themecolor: themecolor.name,
                textdark: themecolor.textdark,
                bgdark: themecolor.bgdark,
                textlight: themecolor.textlight,
                bglight: themecolor.bglight,
                main: themecolor.main,
            }
        }

        const updateMetaData = await MetaData.findByIdAndUpdate(collegeid, meta_payload)

        console.log(collegeid, meta_payload);

        const main_page_payload = {
            title: body.title,
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
                imagepath: body.principaldeskpath
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

            const condition = {domain: req.session.metadata.domain}

            const update_query = {
                $set: {
                  'title': main_page_payload.title,
                  'notice.caption': main_page_payload.notice.caption,
                  'importantlink.caption': main_page_payload.importantlink.caption,
                  'aboutcollege.caption': main_page_payload.aboutcollege.caption,
                  'aboutcollege.content': main_page_payload.aboutcollege.content,
                  'principaldesk.caption': main_page_payload.principaldesk.caption,
                  'principaldesk.content': main_page_payload.principaldesk.content,
                  'principaldesk.imagepath': main_page_payload.principaldesk.imagepath,
                  'section1.caption': main_page_payload.section1.caption,
                  'section1.content': main_page_payload.section1.content,
                  'section2.caption': main_page_payload.section2.caption,
                  'section2.content': main_page_payload.section2.content,
                  'meta_model_id': main_page_payload.meta_model_id
                }
            }

            const updateMainPage = await MainPage.updateOne(condition, update_query)

        res.redirect('main-page')
    }
    
    // Notice

    const notice = async (req,res)=>{

        const domain = req.session.metadata.domain

        const response = await MainPage.findOne({'domain': domain}).select('notice').then(result=>{
            return result
        }).catch(err=>{
            console.error(err)
        })

        res.render('manager/widgets/add-notice',{data:response})

    }

    const news = async (req,res)=>{

        const domain = req.session.metadata.domain

        const response = await MainPage.findOne({'domain': domain}).select('news').then(result=>{
            return result
        }).catch(err=>{
            console.error(err)
        })

        console.log(response);

        res.render('manager/widgets/add-news',{data:response})
    }

  
      const deleteNotice = async (req,res)=>{
        
        const domain = req.session.metadata.domain
        const noticeid = req.params.id

        const updateResult = await MainPage.updateOne(
            {
              'domain': domain,
              'notice.content._id': noticeid
            },
            { $pull: { 'notice.content': { '_id': noticeid } } }
          );
          
          res.redirect('/manager/add-notice')
        //   if (updateResult.nModified > 0) 
        //   else console.log('No matching document or notice content object found');
          
    }
        
    const deleteNews = async (req,res)=>{
        
        const domain = req.session.metadata.domain
        const noticeid = req.params.id

        const updateResult = await MainPage.updateOne(
            {
              'domain': domain,
              'news.content._id': noticeid
            },
            { $pull: { 'news.content': { '_id': noticeid } } }
          );
          
          res.redirect('/manager/add-news')
        //   if (updateResult.nModified > 0) 
        //   else console.log('No matching document or notice content object found');
          
    }
        
    


module.exports = {
    managerDashboard,
    widgetPage,

    // Important Link
    importantLinkPage,
    addImportantLink,
    deleteImportantLink,

    mainPage,
    updateMainPageData,

    // News
    news,
    deleteNews,

    // Notice
    notice,
    deleteNotice,
    
    // Navigation Bar
    navigationPage,
    addNavigationItem,
    addNavigationSubItem,
    deleteNavitem,
    deleteSubNavitem,

    // Footer
    footerPage,
    addFooterItem,
    addFooterSubItem,
    deleteFooteritem,
    deleteSubFooterItem
}