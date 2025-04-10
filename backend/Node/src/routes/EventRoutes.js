const routes = require('express').Router();
const eventController = require('../controllers/EventController');


routes.post('/addEvent', eventController.addEvent);
routes.get('/getEvents', eventController.getEvents);
routes.get('/getEventsByUserId/:userId', eventController.getEventsByUserId);
routes.post('/addEventWithFile',eventController.addEventWithFile);
module.exports = routes;