'use strict';

let helper = require('./helper');

let Middleware = {
    createNew: function () {
        let middleware = {};
        middleware.map = [];

        middleware.add = function (name, callback, weight) {
            weight = weight || 100;
            for (let i = 0; i < middleware.map.length; i += 1) {
                if (middleware.map[i].name === name) {
                    return;
                }
            }
            middleware.map.push({
                name: name,
                callback: callback,
                weight: weight
            })
        };

        middleware.handle = function (map, app) {
            middleware.map.sort(helper.compareWeight);
            for (let i = 0; i < middleware.map.length; i += 1) {
                if (app.resIsEnd === true)
                    return;
                if (map.indexOf(middleware.map[i].name) >= 0)
                    middleware.map[i].callback(app);
            }

        };

        return middleware;
    }
};

exports = module.exports = Middleware;