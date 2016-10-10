const app = require('express')();
require('./routes')(app);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Node.js listening on port ${port} ...`);
});
