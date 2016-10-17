const History = require('../models/history');

const getHistory = (socket) => {
  History.find().exec((err, history) => {
    if (err) {
      throw err;
    }
    socket.emit('history', history); // Initial sending of stock history from database
    socket.on('my other event', (data) => { // testing dummy response from client
      console.log(data);
    });
  });
};

module.exports = { getHistory };
