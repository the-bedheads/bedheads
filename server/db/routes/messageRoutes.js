const { Router } = require('express');
const { Op } = require('sequelize');
const axios = require('axios');

const {
  User,
  Message,
  Thread,
} = require('../index');

const messageRouter = Router();

// get users threads
messageRouter
  .get('/getThreads/:userId', async (req, res) => {
    const { userId } = req.params;
    const test = await Thread.findAll({
      where: {
        [Op.or]: [
          { user1_id: Number(userId) },
          { user2_id: Number(userId) },
        ],
      },
    },
    {
      order: [
        ['updatedAt', 'DESC'],
      ],
    })
      .catch((err) => console.info('GET message/getThreads/:userId failed'));
    const result = test.map((thread) => thread.id);
    res.send(result);
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
      })
      .catch((err) => console.info('GET message/getName failed'));
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
      })
      .catch((err) => {
        console.info('GET message/getMessages failed');
        res.send([]);
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
    })
      .catch((err) => console.info('POST message/newMessage failed'));
    res.send('success!');
  });

// get thread back, or create one if it doesn't exist
messageRouter
  .get('/thread', async (req, res) => {
    const { hostId, userId } = req.query;
    let thread = await Thread.findOne({
      where: {
        [Op.or]: [
          {
            user1_id: Number(hostId),
            user2_id: Number(userId),
          },
          {
            user1_id: Number(userId),
            user2_id: Number(hostId),
          },
        ],
      },
    })
      .catch((err) => console.info('GET message/thread failed'));
    if (!thread) {
      thread = await Thread.create({
        user1_id: Number(userId),
        user2_id: Number(hostId),
      })
        .then((data) => {
          console.info('Thread created');
          return data;
        })
        .catch(() => console.info('Unable to create thread'));
    }
    res.send(thread);
  });

module.exports = {
  messageRouter,
};
