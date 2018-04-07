// A singleton pattern that ensures that sequelize connection is instantiated only once.
// This is going to allow us load this module innumerable time via a single db connection.

import fs from "fs";
import path from "path";
import Sequelize from "sequelize";

// import config from "./libs/config";

// let sequelize = null;
let db = null;

module.exports = app => {
    if (!db) {
        const config = app.libs.config; //grabs db settings
        const sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            config.params
        );

        db = {
            sequelize,
            Sequelize,
            models: {}
        };

        // grab the models directory
        const dir = path.join(__dirname, "models");

        // convert the model directory for each model into a single file and import via
        // sequelize.import(), then, save into the models object declared in db object.

        // This is an array of string referring to the file names in the models directory
        fs.readdirSync(dir).forEach(file => {
            const modelDir = path.join(dir, file); //i.e models/tasks
            const model = sequelize.import(modelDir); //loads all models
            db.models[model.name] = model;
        });

        // grabs all keys of the models  and iterate through them
        Object.keys(db.models).forEach(key => {
            // this ensure the models' relationship
            if (db.models[key].hasOwnProperty('associate')){
                db.models[key].associate(db.models);
            }
            // or this
            // db.models[key].options.classMethods.associate(db.models);
        });
    }

    return db;
};