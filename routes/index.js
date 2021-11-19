/**
 * This module connects modules to routes
 */
module.exports = app => {
    var router = require("express").Router();
    var memberRouter = require("./members");
};

//declare our router functions here
//const { getFunction } = require('./members');

/*router.all('*', async (request, response, next) => {
    if (response.locals.forceSettingsRoute) {
        await getSettings(request, response, next);
        return;
    }
    next();
});*/
