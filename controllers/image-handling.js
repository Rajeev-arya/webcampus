const Gallery = require("../models/gallery");
const MainPage = require("../models/home_page");
const mongoose = require('mongoose')

const imageUploadPage = async(req,res)=>{
    const domain = req.session.metadata.domain
    const response = await Gallery.findOne({domain})


    res.render('manager/widgets/image-upload', {data: response})
}

const imageUpload = async(req, res)=>{
    
    const domain = req.session.metadata.domain
    let payload = req.image
    payload = {
      
      _id: new mongoose.Types.ObjectId(),
        newimagename: payload.newimagename,
        foldername: req.body.foldername

    }


    const response = await Gallery.findOneAndUpdate(
        { domain: domain },
        { $push: { 'image': payload } },
        { new: true }
      );
    console.log(req.image);
    res.redirect('/manager/upload-image')
    
}

const imagetype = async(req,res)=>{
    const domain = req.session.metadata.domain
    const payload = {
      
      _id: new mongoose.Types.ObjectId(),
        name: req.body.imagename,
        path: req.body.imagepath
    }

    const response = await Gallery.findOneAndUpdate({domain},
            { $push: { 'foldertype': payload } },
            { new: true }
        )
        
    res.redirect('/manager/upload-image')
}

const deleteimage = async (req,res)=>{


    // Mongoose method to delete an image by ID
    const deleteImageById = async (imageId) => {
        try {
        const result = await Gallery.updateOne(
            { 'image._id': imageId },
            { $pull: { 'image': { _id: imageId } } }
        );
    
        console.log(result);
        } catch (error) {
        console.error(error);
        }
    };

    const idtodelete = req.params.id

    deleteImageById(idtodelete)

    res.redirect('/manager/upload-image')
}

const uploadPrincipal = async (req,res)=>{

  const domain = req.session.metadata.domain
  const imagename = req.image.principal
  const updatePrincipal = async (newPrincipalValue) => {
      try {
        const result = await Gallery.updateOne(
          { domain}, // Replace with the actual domain value
          { $set: { principal: newPrincipalValue } }
        );
    
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };

    updatePrincipal(imagename);

    res.redirect('/manager/upload-image')
}


const uploadNotice = async (req,res)=>{

  const domain = req.session.metadata.domain

  const payload = {
    caption: req.body.caption,
    filepath: req.image.notice,
    date: req.body.date
  }

      await MainPage.findOneAndUpdate(
        { domain: domain },
        { $push: { 'notice.content': payload } },
        { new: true }
    );
    res.redirect('/manager/add-notice')
  }

  const uploadNews = async (req,res)=>{

    const domain = req.session.metadata.domain
  
    const payload = {
      caption: req.body.caption,
      filepath: req.image.notice,
      date: req.body.date
    }
  
        await MainPage.findOneAndUpdate(
          { domain: domain },
          { $push: { 'news.content': payload } },
          { new: true }
      );
      res.redirect('/manager/add-news')
    }
  

const uploadDirector = async (req,res)=>{

    const domain = req.session.metadata.domain
    const imagename = req.image.principal
    const updatePrincipal = async (newPrincipalValue) => {
        try {
          const result = await Gallery.updateOne(
            { domain}, // Replace with the actual domain value
            { $set: { director: newPrincipalValue } }
          );
      
          console.log(result);
        } catch (error) {
          console.error(error);
        }
      };

      updatePrincipal(imagename);

      res.redirect('/manager/upload-image')
}

const uploadSecretary = async (req,res)=>{

    const domain = req.session.metadata.domain
    const imagename = req.image.principal
    const updatePrincipal = async (newPrincipalValue) => {
        try {
          const result = await Gallery.updateOne(
            { domain}, // Replace with the actual domain value
            { $set: { secretary: newPrincipalValue } }
          );
      
          console.log(result);
        } catch (error) {
          console.error(error);
        }
      };

      updatePrincipal(imagename);

      res.redirect('/manager/upload-image')
}

const uploadIncharge = async (req,res)=>{

  const domain = req.session.metadata.domain
  const imagename = req.image.principal
  const updatePrincipal = async (newPrincipalValue) => {
      try {
        const result = await Gallery.updateOne(
          { domain}, // Replace with the actual domain value
          { $set: { incharge: newPrincipalValue } }
        );
    
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };

    updatePrincipal(imagename);

    res.redirect('/manager/upload-image')
}

const uploadcollegeheader = async (req,res)=>{

    const domain = req.session.metadata.domain
    const imagename = req.image.principal
    const updatePrincipal = async (newPrincipalValue) => {
        try {
          const result = await Gallery.updateOne(
            { domain}, // Replace with the actual domain value
            { $set: { collegeheader: newPrincipalValue } }
          );
      
          console.log(result);
        } catch (error) {
          console.error(error);
        }
      };

      updatePrincipal(imagename);

      res.redirect('/manager/upload-image')
}

const uploadLogo = async (req,res)=>{

    const domain = req.session.metadata.domain
    const imagename = req.image.principal
    const updatePrincipal = async (newPrincipalValue) => {
        try {
          const result = await Gallery.updateOne(
            { domain}, // Replace with the actual domain value
            { $set: { logo: newPrincipalValue } }
          );
      
          console.log(result);
        } catch (error) {
          console.error(error);
        }
      };

      updatePrincipal(imagename);

      res.redirect('/manager/upload-image')
}





module.exports = {
    imageUploadPage, 
    imageUpload, 
    imagetype, 
    deleteimage,
    uploadPrincipal,
    uploadDirector,
    uploadSecretary,
    uploadIncharge,
    uploadLogo,
    uploadcollegeheader,
    uploadNotice,
    uploadNews
}
