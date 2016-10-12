const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
  symbol: {
    type: String,
    uppercase: true
  },
  history: [{
    tradingDay: String,
    open: Number,
    high: Number,
    low: Number,
    close: Number
  }]
});

module.exports = mongoose.model('History', HistorySchema);
