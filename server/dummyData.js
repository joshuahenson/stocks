const History = require('./models/history');

const dummyData = () => {
  History.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
    const symbol1 = new History({
      symbol: 'ibm',
      days:
      [
        {
          symbol: 'IBM',
          timestamp: '2016-10-06T00:00:00-04:00',
          tradingDay: '2016-10-06',
          open: 156.84,
          high: 157.43,
          low: 155.89,
          close: 156.88,
          volume: 1950100,
          openInterest: null
        },
        {
          symbol: 'IBM',
          timestamp: '2016-10-07T00:00:00-04:00',
          tradingDay: '2016-10-07',
          open: 157.14,
          high: 157.7,
          low: 154.86,
          close: 155.67,
          volume: 2671800,
          openInterest: null
        },
        {
          symbol: 'IBM',
          timestamp: '2016-10-10T00:00:00-04:00',
          tradingDay: '2016-10-10',
          open: 156.71,
          high: 158.49,
          low: 156.66,
          close: 157.02,
          volume: 2481200,
          openInterest: null
        }]
    });
    const symbol2 = new History({
      symbol: 'msft',
      days: [
        {
          symbol: 'msft',
          timestamp: '2016-10-06T00:00:00-04:00',
          tradingDay: '2016-10-06',
          open: 57.74,
          high: 57.86,
          low: 57.28,
          close: 57.74,
          volume: 16212600,
          openInterest: null
        },
        {
          symbol: 'msft',
          timestamp: '2016-10-07T00:00:00-04:00',
          tradingDay: '2016-10-07',
          open: 57.85,
          high: 57.98,
          low: 57.42,
          close: 57.8,
          volume: 20089000,
          openInterest: null
        },
        {
          symbol: 'msft',
          timestamp: '2016-10-10T00:00:00-04:00',
          tradingDay: '2016-10-10',
          open: 57.91,
          high: 58.39,
          low: 57.87,
          close: 58.04,
          volume: 18196500,
          openInterest: null
        }
      ]
    });

    History.create([symbol1, symbol2], (error) => {
      if (error) {
        console.log('error in dummy data');
      } else {
        console.log('dummy data created');
      }
    });
  });
};

module.exports = dummyData;
