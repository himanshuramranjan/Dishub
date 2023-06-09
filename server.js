const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env'});

const app = require('./app');

// Close Down server on any uncaught exception
process.on('uncaughtException', (err) => {

    console.log(err.message);
    console.log('Shutting down the server due to some uncaught exception');

    process.exit(1);
});

// Define DB connection URI String
const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PSWD
);

// Connect to DB
mongoose.connect(DB, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true
}).then(con => {
    console.log('Connected w/ MongoDB');
})

// Define PORT
const PORT = process.env.PORT || 8080;

// Running the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on the PORT: ${PORT}`);
});

// Close Down Server on Unhadled Rejections from promise
process.on('unhandledRejection', err => {

    console.log(err.message);
    console.log('Shutting down the server due to unhandled promise rejections..');

    server.close(() => {
        process.exit(1);
    });
});
