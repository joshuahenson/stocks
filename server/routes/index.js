module.exports = (app) => {
  app.get('/testing', (req, res) => {
    res.json('testing');
  });
};
