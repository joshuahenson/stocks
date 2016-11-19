const History = require('../models/history');
const axios = require('axios');

const padNum = (num) => {
  if (num.toString().length === 2) {
    return num;
  }
  return `0${num}`;
};

const addSymbol = (symbol, io, socket) => {
  const today = new Date();
  const yearAgo = `${today.getFullYear() - 1}${padNum(today.getMonth()) + 1}${padNum(today.getDate())}`;
  const addHistory = () => axios.get(`http://marketdata.websol.barchart.com/getHistory.json?key=${process.env.BARCHART_KEY}&symbol=${symbol}&type=daily&startDate=${yearAgo}&order=asc`);
  const addRecent = () => axios.get(`http://marketdata.websol.barchart.com/getQuote.json?key=${process.env.BARCHART_KEY}&symbols=${symbol}`);
  axios.all([addHistory(), addRecent()])
    .then(axios.spread((history, recent) => {
      if (history.data.status.code === 204) {
        socket.emit('error message', { message: 'Please enter a valid ticker symbol.' });
      } else {
        History.findOneAndUpdate(
          { symbol: symbol.toUpperCase() },
          { $set: {
            days: history.data.results,
            name: recent.data.results[0].name,
            recent: {
              lastPrice: recent.data.results[0].lastPrice,
              netChange: recent.data.results[0].netChange,
              percentChange: `${recent.data.results[0].percentChange}%`,
              tradeTimestamp: new Date(recent.data.results[0].tradeTimestamp)
            }
          } },
          { new: true, upsert: true },
          (err, doc) => {
            if (err) {
              console.error(err);
            }
            io.emit('new symbol', doc);
            socket.emit('added symbol');
          }
        );
      }
    }))
    .catch((err) => {
      console.error(err);
      socket.emit('error message', { message: 'Server error. Please try again.' });
    });
};

const deleteSymbol = (symbol, io) => {
  io.emit('delete symbol', { symbol });
  History.find({ symbol }).remove().exec((err) => {
    if (err) {
      console.error(err);
    }
  });
};

const updateIndividual = (symbol) => {
  const today = new Date();
  const yearAgo = `${today.getFullYear() - 1}${padNum(today.getMonth()) + 1}${padNum(today.getDate())}`;
  axios.get(`http://marketdata.websol.barchart.com/getHistory.json?key=${process.env.BARCHART_KEY}&symbol=${symbol}&type=daily&startDate=${yearAgo}&order=asc`)
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

const getRecent = (io) => {
  History.find().exec((err, history) => {
    if (err) {
      throw err;
    }
    const symbols = history.map(stock => stock.symbol).join();
    axios.get(`http://marketdata.websol.barchart.com/getQuote.json?key=${process.env.BARCHART_KEY}&symbols=${symbols}`)
      .then(res => res.data.results.forEach((stock) => {
        const recent = {
          lastPrice: stock.lastPrice,
          netChange: stock.netChange,
          percentChange: `${stock.percentChange}%`,
          tradeTimestamp: new Date(stock.tradeTimestamp)
        };
        History.update(
          { symbol: stock.symbol },
          { $set: { recent } },
          (err) => {
            if (err) {
              console.error(err);
            }
          }
        );
        io.emit('get recent', { symbol: stock.symbol, recent });
      }))
      .catch(err => console.error(err));
  });
};

module.exports = { getHistory, addSymbol, deleteSymbol, updateHistory, getRecent };
