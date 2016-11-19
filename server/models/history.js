const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  symbol: {
    type: String,
    uppercase: true,
    unique: true
  },
  days: [{
    tradingDay: String,
    open: Number,
    high: Number,
    low: Number,
    close: Number
  }],
  name: String,
  recent: {
    lastPrice: Number,
    netChange: Number,
    percentChange: String
  }
});

module.exports = mongoose.model('History', HistorySchema);
