
const admindata = (req, res, next) => {
    // Add session data to res.locals for direct access in EJS templates
    // console.log(req.session);
    res.locals.metadata = req.session.metadata || null; // Change 'user' to your specific session data
    next();
};

const managerdata = (req, res, next) => {
    // Add session data to res.locals for direct access in EJS templates
    // console.log(req.session.metadata);
    res.locals.metadata = req.session.metadata || null; // Change 'user' to your specific session data
    res.locals.metadata = req.session.metadata || null; // Change 'user' to your specific session data
    next();
};

module.exports = {admindata, managerdata}