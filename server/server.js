const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
require('dotenv').config();
require('./routes')(app);
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const historyController = require('./controllers/historyController');

// Declare native promise for mongoose in place of deprecated mpromise
mongoose.Promise = global.Promise;

const uristring = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/stocks';
mongoose.connect(uristring, (err) => {
  if (err) {
    console.error(`ERROR connecting to: ${uristring}. ${err}`);
  } else {
    console.log(`Succeeded connecting to: ${uristring}`);
  }
});

require('./dummyData')(); // TODO: Remove function to load dummy data into db

let socketCounter = 0;

io.on('connection', (socket) => {
  socketCounter += 1;
  console.log(`${socketCounter} socket connections active`);
  historyController.getHistory(socket);
  socket.on('disconnect', () => {
    socketCounter -= 1;
    console.log(`${socketCounter} socket connections active`);
  });
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Node.js listening on port ${port} ...`);
});
