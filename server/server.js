const app = require('express')();
require('./routes')(app);
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');

const uristring = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/stocks';
mongoose.connect(uristring, (err) => {
  if (err) {
    console.error(`ERROR connecting to: ${uristring}. ${err}`);
  } else {
    console.log(`Succeeded connecting to: ${uristring}`);
  }
});

require('./dummyData')(); // TODO: Remove function to load dummy data into db

io.on('connection', (socket) => {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', (data) => {
    console.log(data);
  });
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Node.js listening on port ${port} ...`);
});
