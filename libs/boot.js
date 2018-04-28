import https from "https";
import fs from "fs";

// for server initialization 
module.exports = app => {
    // This prevents the db server from running twice in the test environment
   if (process.env.NODE_ENV !== "test") {

        const credentials = {
            key: fs.readFileSync('63195140_ntask.localhost.key', 'utf-8'),
            cert: fs.readFileSync('63195140_ntask.localhost.cert', 'utf-8')
        }
        // sync function performs alterations in db tables 
        // app.db.sequelize.sync({ force: true, logging: console.log}).done(() => { drops db and recreate
        app.db.sequelize.sync().done(() => {
            // https.createServer(credentials, app)
            app.listen(app.get("port"), () => {    //grabs a set value with app.get()
                console.log(`NTask API - Port ${app.get("port")}`);
            });
        });
   }
};