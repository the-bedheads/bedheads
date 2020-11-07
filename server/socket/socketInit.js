const { Router } = require('express');

const socketRouter = Router();

socketRouter
  .get('/', (req, res) => {
    res.send('server is up and running');
  });

module.exports = {
  socketRouter,
};
