const History = require('../models/history');
const axios = require('axios');

// helper function I plan on using to update existing symbols daily and get info for new symbols
// TODO: fix startDate in URL
const loadHistory = (symbol) => {
  axios.get(`http://marketdata.websol.barchart.com/getHistory.json?key=${process.env.BARCHART_KEY}&symbol=${symbol}&type=daily&startDate=20161006&order=asc`)
    .then((res) => {
      History.update(
        { symbol: symbol.toUpperCase() },
        { $set: { days: res.data.results } },
        { upsert: true },
        (err) => {
          if (err) {
            console.error(err);
          }
        }
      );
    });
};

const addSymbol = (req, res) => {
  const symbol = req.body.symbol;
  loadHistory(symbol);
  res.status(200).end();
};

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

module.exports = { getHistory, addSymbol };
