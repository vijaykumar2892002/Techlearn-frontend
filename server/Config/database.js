const mongoose = require("mongoose");
require("dotenv").config();
const connectWithDb = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
        
    })
        .then(console.log("DB Connected Successfully"))
        .catch((error) => {
            console.log("DB Facing Connection Issues");
            console.log(error);
            process.exit(1);
        })
};

module.exports = connectWithDb;