const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
require('dotenv').config();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');
const schedule = require('node-schedule');
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

// Ensure that stock prices are up to date when server is rebooted
// and updated at end of the day when api is updated
// May need to edit time if server has different timezone?
// TODO: uncomment next line when I'm done constantly rebooting server
// historyController.updateHistory();
schedule.scheduleJob('* 14 * * 1-5', () => {
  const time = new Date();
  console.log(`Stock histories updated at ${time.toString()}`);
  historyController.updateHistory();
});

require('./dummyData')(); // TODO: Remove function to load dummy data into db

let socketCounter = 0;
let timer;

io.on('connection', (socket) => {
  socketCounter += 1;
  console.log(`${socketCounter} socket connections active`);
  if (socketCounter === 1) {
    console.log('start');
    historyController.getRecent(socket);
    timer = setInterval(() => historyController.getRecent(io), 300000);
  }
  historyController.getHistory(socket);
  socket.on('client add symbol', data => historyController.addSymbol(data.symbol, io));
  socket.on('disconnect', () => {
    socketCounter -= 1;
    console.log(`${socketCounter} socket connections active`);
    if (socketCounter === 0) {
      console.log('Stopping timer');
      clearInterval(timer);
    }
  });
});

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Node.js listening on port ${port} ...`);
});
