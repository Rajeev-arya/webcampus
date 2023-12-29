const {PORT, URL, express, database, expressMiddleware} = require("./util/imports")

// Import router
const adminRouter = require('./routes/admin')
const managerRouter = require('./routes/manager')
const loginRouter = require('./routes/login')
const publicRouter = require('./routes/public')
const {admindata, managerdata} = require("./middlewares/session")
const AdminUser = require("./models/admin_user")
const { adminLoggedIn, managerLoggedIn } = require("./middlewares/auth")
const MainPage = require("./models/home_page")

// Initialise the application
const app = express()
const DEFAULT_PORT =  PORT || 3000 

// Database connection
database(URL)

// Express middlewares # jsonparser #urlencoding #staticpath
expressMiddleware(app)


// Routes
// app.get('/',async (req,res)=>{
//     res.render('index')
// })
// Routes
// app.post('/',async (req,res)=>{
//     await AdminUser.create({username:"Aditya",password:"123456"})
//     res.render('index')
// })

app.use('/admin',admindata, adminLoggedIn, adminRouter)

app.use('/manager',managerdata, managerLoggedIn, managerRouter)

app.use('/login', loginRouter)
app.use('/', publicRouter)



// testing route
app.patch('/testing', async (req, res)=>{
    const payload = req.body
    const domain = req.session.metadata._id
    console.log(payload);
    // return res.json(payload)
    const response = await MainPage.findOne({domain: domain,  'importantlink.content._id': payload })
    res.json(response)
})

const mongoose = require('mongoose')
// testing route
// app.patch('/color-array', async (req, res)=>{
    
//     // The new object to be inserted into the colourpallet array
//     const newColor = {
//         name: 'green',
//         textdark: '#38235f',
//         bgdark: '#9055FD',
//         main: '#a677ff',
//         textlight: '#bc97ff',
//         bglight: '#e8dcff',
//       };
    
//     // Find the user by adminid (replace 'adityadesk' with the actual adminid)
//     const adminIdToFind = 'adityadesk';
//     try {
//         // Find the user by adminid (replace 'adityadesk' with the actual adminid)
//         const user = await AdminUser.findOne({ adminid: 'adityadesk' });
    
//         if (user) {
//           // If the user is found, push the newColor object into the colourpallet array
//           user.theme.colourpallet.push(newColor);
    
//           // Save the updated user document
//           const updatedUser = await user.save();
    
//           console.log('New color added:', newColor);
//           console.log('Updated user:', updatedUser);
//         } else {
//           console.log('User not found');
//         }
//       } catch (error) {
//         console.error(error);
//       } finally {
//         // Close the MongoDB connection
//         mongoose.connection.close();
//       }
//     }
      
//     )
// app.patch('/change-color', async (req, res)=>{
    
// // The new object to be inserted into the colourpallet array
// const updatedColor = {
//     _id: "656cbbc8509115727bf6daed",
//     name: 'Pink',
//     textdark: '#330010',
//     bgdark: '#660020',
//     main: '#990030',
//     textlight: '#ff6696',
//     bglight: '#ffe6ee',
//   };

// // Find the user by adminid (replace 'adityadesk' with the actual adminid)
// const adminIdToFind = 'adityadesk';
// try {
//     // Find the user by adminid (replace 'adityadesk' with the actual adminid)
//     const user = await AdminUser.findOne({ adminid: 'adityadesk' });

//     if (user) {
//       // If the user is found, push the newColor object into the colourpallet array
//     //   user.theme.colourpallet.push(newColor);
//       const colorIndex = user.theme.colourpallet.findIndex(color => color._id.equals(updatedColor._id));


//       if (colorIndex !== -1) {
//         // If the color is found, update its values
//         user.theme.colourpallet[colorIndex] = updatedColor;


//       // Save the updated user document
//       const updatedUser = await user.save();

//     //   console.log('New color added:', newColor);
//       console.log('Updated user:', updatedUser);
//       res.json({message: "Succesful"})
//     } else {
//       console.log('User not found');
//     }
//   }} catch (error) {
//     console.error(error);
//   } finally {
//     // Close the MongoDB connection
//     mongoose.connection.close();
//   }
// }
  
// )

// Run server
app.listen(DEFAULT_PORT,()=>{
    console.log(`The Server is running on PORT  : ${DEFAULT_PORT}`)
})