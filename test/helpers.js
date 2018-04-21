import supertest from 'supertest';
import chai from 'chai';
import app from '../index';

// this is a nodejs global variable that sets the app globally
global.app = app;

global.request = supertest(app);
global.expect = chai.expect;