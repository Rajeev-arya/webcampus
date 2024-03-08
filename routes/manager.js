const express = require("express");
const { managerEjsLayout } = require("../middlewares/default");
const {
  managerDashboard,
  widgetPage,
  importantLinkPage,
  addImportantLink,
  navigationPage,
  addNavigationItem,
  addNavigationSubItem,
  mainPage,
  updateMainPageData,
  addNotice,
  deleteNavitem,
  deleteSubNavitem,
  footerPage,
  addFooterItem,
  addFooterSubItem,
  deleteFooteritem,
  deleteSubFooterItem,
  deleteImportantLink,
  notice,
  news,
  deleteNotice,
  deleteNews,
  headerLinkPage,
  addHeaderLink,
  deleteHeaderLink,
} = require("../controllers/manager");
const { managerLogout } = require("../controllers/login");
const {
  imagetype,
  imageUpload,
  imageUploadPage,
  deleteimage,
  uploadPrincipal,
  uploadSecretary,
  uploadDirector,
  uploadIncharge,
  uploadLogo,
  uploadNotice,
  uploadNews,
  uploadcollegeheader,
  uploaddocuments,
} = require("../controllers/image-handling");
const {
  sliderStorage,
  sliderMiddlerware,
  principalMiddleware,
  principalStorage,
  noticeMiddleware,
  noticeStorage,
  newsStorage,
  newsMiddleware,
  documentMiddleware,
  documentStorage,
} = require("../middlewares/image-handling");
const { pageCreatorPage, pageCreator } = require("../controllers/page-manage");

const app = express();

managerEjsLayout(app);

app.route("/").get(managerDashboard);
app.route("/widgets").get(widgetPage);
// app.route('/add-navigation').get(add)
app.get("/add-notice", notice);
app.get("/delete-notice/:id", deleteNotice);
app.get("/add-news", news);
app.get("/delete-news/:id", deleteNews);
// app.route('/edit-link/:id').get(editLinkPage)

// Header Link
app.route("/add-headerlink").get(headerLinkPage).post(addHeaderLink);
app.route("/delete-headerlink/:id").get(deleteHeaderLink);

// Important Link
app.route("/add-link").get(importantLinkPage).post(addImportantLink);
app.route("/delete-link/:id").get(deleteImportantLink);

// Navigation
app.route("/add-navigation").get(navigationPage).post(addNavigationItem);
app.route("/add-nav-sublink/:id").post(addNavigationSubItem);
app.route("/delete-navitem/:id").get(deleteNavitem);
app.route("/delete-navsubitem/:id/:subid").get(deleteSubNavitem);

// Footer
app.route("/add-footer").get(footerPage).post(addFooterItem);
app.post("/add-footer-sublink/:id", addFooterSubItem);
app.get("/delete-footeritem/:id", deleteFooteritem);
app.get("/delete-footersubitem/:id/:subid", deleteSubFooterItem);

app.route("/logout").get(managerLogout);
app.route("/page-creator/:id").get(pageCreatorPage).post(pageCreator);
app.route("/main-page").get(mainPage);
app.route("/update-main-page").post(updateMainPageData);
// app.route('/upload-slider').get(sliderPage)
// app.post('')

// Image manipulation

app.post(
  "/upload-documents",
  documentStorage.single("upload"),
  documentMiddleware,
  uploaddocuments
);
app.get("/upload-image", imageUploadPage);
app.post(
  "/upload-image",
  sliderStorage.single("slider"),
  sliderMiddlerware,
  imageUpload
);
app.post(
  "/upload-principal",
  principalStorage.single("principal"),
  principalMiddleware,
  uploadPrincipal
);
app.post(
  "/upload-director",
  principalStorage.single("principal"),
  principalMiddleware,
  uploadDirector
);
app.post(
  "/upload-secretary",
  principalStorage.single("principal"),
  principalMiddleware,
  uploadSecretary
);
app.post(
  "/upload-principal",
  principalStorage.single("principal"),
  principalMiddleware,
  uploadPrincipal
);
app.post(
  "/upload-incharge",
  principalStorage.single("principal"),
  principalMiddleware,
  uploadIncharge
);
app.post(
  "/upload-logo",
  principalStorage.single("principal"),
  principalMiddleware,
  uploadLogo
);
app.post(
  "/upload-collegeheader",
  principalStorage.single("principal"),
  principalMiddleware,
  uploadcollegeheader
);
app.post(
  "/add-notice",
  noticeStorage.single("notice"),
  noticeMiddleware,
  uploadNotice
);
app.post("/add-news", newsStorage.single("notice"), newsMiddleware, uploadNews);
app.route("/add-image-type").post(imagetype);
app.get("/delete-image/:id", deleteimage);

module.exports = app;
