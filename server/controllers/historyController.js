const History = require('../models/history');
const axios = require('axios');

// TODO: fix startDate in URL
const addSymbol = (symbol, socket) => {
  axios.get(`http://marketdata.websol.barchart.com/getHistory.json?key=${process.env.BARCHART_KEY}&symbol=${symbol}&type=daily&startDate=20161006&order=asc`)
    .then((res) => {
      History.findOneAndUpdate(
        { symbol: symbol.toUpperCase() },
        { $set: { days: res.data.results } },
        { new: true, upsert: true },
        (err, doc) => {
          if (err) {
            console.error(err);
          }
          socket.emit('new symbol', doc);
        }
      );
    });
};

// TODO: fix startDate in URL
const updateIndividual = (symbol) => {
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

// Performed once at end of day after stock api is updated
const updateHistory = () => {
  History.find().exec((err, history) => {
    if (err) {
      console.error(err);
    }
    history.map(stock => updateIndividual(stock.symbol));
  });
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

module.exports = { getHistory, addSymbol, updateHistory };
