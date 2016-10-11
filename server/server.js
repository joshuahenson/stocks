const app = require('express')();
require('./routes')(app);
const server = require('http').createServer(app);
const io = require('socket.io')(server);

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
