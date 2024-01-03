const options = {
    poolSize: 5, // Maximum number of sockets in the connection pool
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

await mongoose.connect(URL, options)


// Get the default connection
const db = mongoose.connection;

    // Event handler for MongoDB connection errors
    db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    });

    // Event handler for successful MongoDB connection
    db.once('open', () => {
    console.log('MongoDB connected successfully');
    });

    // Event handler for handling Node.js process termination
    process.on('SIGINT', () => {
    db.close(() => {
        console.log('MongoDB connection closed due to app termination');
        process.exit(0);
    });
});