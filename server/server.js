const app = require('express')();
require('./routes')(app);
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');

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

const History = require('./models/history');

let socketCounter = 0;

io.on('connection', (socket) => {
  socketCounter += 1;
  console.log(`${socketCounter} socket connections active`);
  History.find().exec((err, history) => {
    if (err) {
      throw err;
    }
    socket.emit('history', history); // Initial sending of stock history from database
    socket.on('my other event', (data) => { // testing dummy response from client
      console.log(data);
    });
  });
  socket.on('disconnect', () => {
    socketCounter -= 1;
    console.log(`${socketCounter} socket connections active`);
  });
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Node.js listening on port ${port} ...`);
});
