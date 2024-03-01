const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

mongoose.connect(process.env.MONGO_URL, {
    dbName: process.env.DB_NAME
})
    .then(() => {
        console.log('connect to mongoose');

    })
    .catch((error) => {
        console.log(error);
    });

mongoose.connection.on('connected', () => {
    console.log('mongoose connected to db');
});

mongoose.connection.on('error', (error) => {
    console.log(`errror on mongoos ${error.message}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('mongoose disconnected');
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
})