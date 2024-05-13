module.exports = app => {
    const users = require('../controllers/user.controller.js');

    const express = require('express');
    const router = express.Router();

    router.post("/users", users.create);

    app.use("/api", router);
};