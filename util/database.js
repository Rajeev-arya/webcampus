const mongoose  = require("mongoose")

async function database(URL) {
    const makeConnection = await mongoose.connect(URL)
    try {
        console.log("Database connected Succesfully")
    } catch (error) {
        console.error(error)
    }

    return makeConnection
}

module.exports = database