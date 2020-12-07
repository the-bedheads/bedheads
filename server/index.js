const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./db/index.js');

const PORT = process.env.STATE === 'dev' ? 3000 : 8000;
const { listingRouter } = require('./db/routes/listingRoutes');
const { userRouter } = require('./db/routes/userRoutes');
const { availabilityRouter } = require('./db/routes/availabilityRoutes');
const { dashboardRouter } = require('./db/routes/dashboardRoutes.js');
const { mapRouter } = require('./api/Map');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { requestRouter } = require('./db/routes/requestRoutes.js');
const { listingPhotosRouter } = require('./db/routes/listingPhotosRoutes.js');
const { imageRouter } = require('./api/cloudinaryRoutes')
const { socketRouter } = require('./socket/socketInit');
const { personalityRouter } = require('./api/ibmPersonalityTraits');
const { messageRouter } = require('./db/routes/messageRoutes');
const { bulletinRouter } = require('./db/routes/bulletinRoutes')
const { reviewRouter } = require('./db/routes/reviewRoutes');

const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true,
}));
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(cookieParser());
const DIR = path.join(__dirname, '../build');
const htmlFile = path.join(DIR, 'index.html');
app.use(express.static(DIR));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

/// ///////////////////////// ROUTES ////////////////////////////
app.use(express.static(path.join(__dirname, '../build')));

app.use('/auth', require('./routes/jwtAuth'));
app.use('/dashboard', require('./routes/dashboard'));

app.use('/reviews', reviewRouter);
app.use('/listing', listingRouter);
app.use('/user', userRouter);
app.use('/availability', availabilityRouter);
app.use('/dashboardInfo', dashboardRouter);
app.use('/request', requestRouter);
app.use('/map', mapRouter);
app.use('/image', imageRouter);
app.use('/personality', personalityRouter);
app.use('/socket', socketRouter);
app.use('/message', messageRouter);
app.use('/bulletin', bulletinRouter);
app.use('/listingPhotos', listingPhotosRouter);

app.get('/*', (req, res) => {
  res.render(htmlFile);
});

const server = http.createServer(app);
const io = socketio(server);

io.sockets.on('connection', (socket) => {
  console.info('socket connected');
  socket.on('room', (room) => {
    socket.join(room);
    console.info(`someone joined room ${room}`);
  });
  socket.on('leave', (room) => {
    socket.leave(room);
    console.info(`someone left room ${room}`);
  });
  socket.on('message', (data) => {
    const { room, msg } = data;
    socket.to(room).emit('message', { msg });
  });
  socket.on('disconnect', () => {
    console.info('disconnected from socket');
  });
});

server.listen(PORT, () => {
  console.info(`Listening on port :${PORT}!`);
});
