const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./db/index.js');

const PORT = process.env.PORT || 3000;
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
<<<<<<< HEAD
});

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  console.info('we have a new connection');
  socket.on('create', (room) => {
    socket.join(room);
    console.info(`someone joined room ${room}`);
  });
=======
>>>>>>> (add) route for dashboard info
});

server.listen(PORT, () => {
  console.info(`Listening on port :${PORT}!`);
});
