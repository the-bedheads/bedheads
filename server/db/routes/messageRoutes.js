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
          { user1Id: Number(userId) },
          { user2Id: Number(userId) },
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
        if (dataValues.user1Id.toString() !== userId) {
          return dataValues.user1Id;
        }
        return dataValues.user2Id;
      })
      .then(async (foundId) => {
        const foundName = await User.findOne({
          where: {
            id: foundId,
          },
        })
          .then((foundUser) => foundUser.firstName);
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
        threadId: Number(thread),
      },
    }, {
      order: '"updatedAt" DESC',
    })
      .then((messageList) => {
        const result = messageList.map((message) => {
          const intermediate = { body: message.dataValues.body };
          if (message.dataValues.userId === Number(userId)) {
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
      threadId: Number(activeThread),
      body: newMessage,
      userId,
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
            user1Id: Number(hostId),
            user2Id: Number(userId),
          },
          {
            user1Id: Number(userId),
            user2Id: Number(hostId),
          },
        ],
      },
    })
      .catch((err) => console.info('GET message/thread failed'));
    if (!thread) {
      thread = await Thread.create({
        user1Id: Number(userId),
        user2Id: Number(hostId),
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
