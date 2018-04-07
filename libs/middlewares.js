import bodyParser from "body-parser";

module.exports = app => {
    app.set("port", 3000); //use the set method in express
    app.set("json spaces", 4); // assings tab to json objects to format

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    app.use((req, res, next) => {
        delete req.body.id;
        next();
    });
}