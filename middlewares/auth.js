const jwt = require('jsonwebtoken')
const JWT_KEY = process.env.JWT_KEY

// Middleware for authentication
const adminLoggedIn = (req, res, next) => {
    try {
      // Retrieve the JWT token from the cookie
      const token = req.cookies.jwt
      // console.log(token);
  
      // If no token is found, return an error
      if (!token) {
        return res.render('login')
        // return res.status(401).json({ message: 'Unauthorized' });
      }
      
      // Verify the token
      const decoded = jwt.verify(token, JWT_KEY);
  
      // Attach the decoded user information to the request
      req.user = decoded;
    
      next(); // Proceed to the next middleware or route
    } catch (error) {
      console.error(error);
      // res.redirect('/')
        res.render('login')
      // res.status(401).json({ message: 'Unauthorized' });
    }
  };

const managerLoggedIn = (req,res, next)=>{
  try {
    // retrive jwt token from the cookies
    const token = req.cookies?.manager_jwt

    if (!token) {
      return res.redirect('/login/manager')
    }

    const decoded = jwt.verify(token, JWT_KEY)

    req.user = decoded

    next()

  } catch (error) {
    console.error(error)
    res.status(401).json({message: 'Unauthorized'})
  }
}

module.exports = {adminLoggedIn, managerLoggedIn}