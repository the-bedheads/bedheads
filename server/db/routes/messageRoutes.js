const { Router } = require('express');
const Sequelize = require('sequelize');
const axios = require('axios');

const {
  User,
  Survey,
  Request,
  ListingPhotos,
  Listing,
  Invite,
  Availability,
  Geolocation,
  models,
  Message,
  Thread,
} = require('../index');
const { send } = require('emailjs-com');

const messageRouter = Router();

// get users threads
messageRouter
  .get('/getThreads/:userId', async (req, res) => {
    const { userId } = req.params;
    const test = await Message.findAll({
      order: [
        ['updatedAt', 'DESC'],
      ],
    },
    {
      where: {
        user_id: userId,
      },
    })
      .then((threadList) => threadList.map((singleThread) => singleThread.thread_id));
    res.send([...new Set(test)]);
  });

// get users name
messageRouter
  .get('/getName/', async (req, res) => {
    const { thread, userId } = req.query;
    const userName = await Thread.findOne({
      where: {
        id: thread,
      },
    })
      .then(({ dataValues }) => {
        if (dataValues.user1_id.toString() !== userId) {
          return dataValues.user1_id;
        }
        return dataValues.user2_id;
      })
      .then(async (foundId) => {
        const foundName = await User.findOne({
          where: {
            id: foundId,
          },
        })
          .then((foundUser) => foundUser.first_name);
        return foundName;
      });
    res.send(userName);
  });

// get all messages in thread
messageRouter
  .get('/getMessages', async (req, res) => {
    const { thread, userId } = req.query;
    const messages = await Message.findAll({
      where: {
        thread_id: Number(thread),
      },
    }, {
      order: '"updatedAt" DESC',
    })
      .then((messageList) => {
        const result = messageList.map((message) => {
          const intermediate = { body: message.dataValues.body };
          if (message.dataValues.user_id === Number(userId)) {
            intermediate.sender = true;
          } else {
            intermediate.sender = false;
          }
          return intermediate;
        });
        return result;
      });
    res.send(messages);
  });

// send a new message
messageRouter
  .post('/newMessage', async (req, res) => {
    const { activeThread, newMessage, userId } = req.body.params;
    await Message.create({
      thread_id: Number(activeThread),
      body: newMessage,
      user_id: userId,
    });
    res.send('success!');
  });

module.exports = {
  messageRouter,
};
