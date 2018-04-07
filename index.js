import express from "express";
import consign from "consign";

// const PORT = 3000;
const app = express();

// consign helps to access all these anywhere 
consign()
    .include("libs/config.js") // becomes app.lib.config when acessing
    //all models are loaded directly by this file
    .then("db.js")     
    .then("libs/middlewares.js")
    .then("routes")
    .then("libs/boot.js")
    .into(app);


module.exports = app;
// app.listen(PORT, () => console.log(`NTASK API - PORT ${PORT}`));