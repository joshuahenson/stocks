const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  symbol: {
    type: String,
    uppercase: true
  },
  days: [{
    tradingDay: String,
    open: Number,
    high: Number,
    low: Number,
    close: Number
  }],
  name: String,
  lastPrice: Number,
  netChange: Number,
  percentChange: String,
  tradeTimestamp: Date
});

module.exports = mongoose.model('History', HistorySchema);
