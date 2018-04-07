// for server initialization 
module.exports = app => {
    // sync function performs alterations in db tables 
   app.db.sequelize.sync().done(() => {
        app.listen(app.get("port"), () => {    //grabs a set value with app.get()
            console.log(`NTask API - Port ${app.get("port")}`);
        });
   });
};