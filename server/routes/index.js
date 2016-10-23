const historyController = require('../controllers/historyController');

module.exports = (app) => {
  app.get('/testing', (req, res) => {
    res.json('testing');
  });
  app.post('/addSymbol', historyController.addSymbol);
};
