'use strict'

const mongoose = require("mongoose");



const dbMong = async () => {

    const dbPath = "mongodb+srv://danielgomes:sinfq2019@cluster0-elzz6.mongodb.net/test?retryWrites=true&w=majority";

    try {
        await mongoose.connect(dbPath, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
          });

        const db = mongoose.connection;
        db.on("error", () => {
            console.log("> error occurred from the database");
        });
        db.once("open", () => {
            console.log("> successfully opened the database");
        });

    } catch (error) { console.log(errors) }


}

module.exports = dbMong;