const AdminUser = require("../models/admin_user");
const jwt = require('jsonwebtoken');
const MetaData = require("../models/meta_data");
const JWT_KEY = process.env.JWT_KEY

const adminPage = async (req,res)=>{
    res.render('admin/login')
}

const managerLoginPage = async (req,res)=>{
    res.render('manager/login')
}

const verifyAdmin = async (req,res)=>{
        try {
            const { username, password } = req.body;

            // Find the user by username in the database
            const user = await AdminUser.findOne({ username });

            // If the user is not found, return an error
            if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
            }
            
            // Compare the provided password with the hashed password in the database
            // (For simplicity, let's assume no password hashing in this example)
            if (password !== user.password) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // console.log(user);
            // Create a JWT token
            const token = jwt.sign({ username: user.username }, JWT_KEY);


            // Set the token in a cookie
            res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour expiration

            // Fetch all college data from database
            await MetaData.find({}).select('_id domain collegename').then(result => {
                req.session.metadata = result
                // console.log(req.session.metadata);
            }).catch(err => {
                console.error(err);
                res.send(err);
            });
            res.redirect('/admin')
        }
            catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
};

const verifyManager = async (req,res)=>{

    try {
        const {username, password} = req.body

        const response = await MetaData.findOne({'user.username': username}).select('user domain navigationbar').then(result=>{
            console.log(result);
            
            req.session.metadata = result
            return result;
        }).catch(err=>{
            console.error(err)
            res.send(err);
        })

        if(!response){
            res.render('/admin/login')
            // return res.status(401).json({message: "Invalid credentials"})
        }

        const user = response.user

        if(password !== user.password){
            res.render('/admin/login')
            // return res.status(401).json({message: "Invalid credentials"})
        }

        const token = jwt.sign({username: user.username, domain: user.domain, navigationbar: user.navigationbar}, JWT_KEY)

        // set the token to the cookie
        res.cookie('manager_jwt', token, {httpOnly: true, maxAge: 3600000})

        res.redirect('/manager')


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

}

const adminLogout = async (req,res)=>{
    
    res.clearCookie('jwt');
    req.session.destroy((err)=>{
        if (err) {
            console.error(err)
            res.send("Error destroying session")
        } else{
            res.redirect('/login')
        }
    })
}

const managerLogout = async (req,res)=>{
    
    res.clearCookie('manager_jwt');
    req.session.destroy((err)=>{
        if (err) {
            console.error(err)
            res.send("Error destroying session")
        } else{
            res.redirect('/manager/login')
        }
    })
}

module.exports = {
    adminPage, 
    verifyAdmin, 
    adminLogout, 
    verifyManager, 
    managerLoginPage, 
    managerLogout
}