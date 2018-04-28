import bodyParser from "body-parser";
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import logger from './logger';

module.exports = app => {
    app.set("port", 3000); //use the set method in express
    app.set("json spaces", 4); // assings tab to json objects to format
    app.use(morgan('common', {
        stream: {
            write: (message) => {
                logger.info(message);
            }
        }
    }));
    app.use(helmet());
    app.use(cors({
        origin: '*',
        methods: ['GET', 'PUT', 'POST', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    app.use(app.auth.initialize()); //helps to initiate passport middleware

    app.use((req, res, next) => {
        delete req.body.id;
        next();
    });

    // for apidoc documentation
    app.use(express.static("public"));
}