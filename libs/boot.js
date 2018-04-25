// for server initialization 
module.exports = app => {
    // This prevents the server from running twice in the test environment
   if (process.env.NODE_ENV !== "test") {
        // sync function performs alterations in db tables 
        // app.db.sequelize.sync({ force: true, logging: console.log}).done(() => { drops db and recreate
        app.db.sequelize.sync().done(() => {
            
            app.listen(app.get("port"), () => {    //grabs a set value with app.get()
                console.log(`NTask API - Port ${app.get("port")}`);
            });
        });
   }
};