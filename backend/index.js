const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require('./db');
const createUserRouter = require('./Routes/CreateUser');
const displaydataRouter = require("./Routes/DisplayData");
const orderdataRouter = require("./Routes/OrderData")

mongoDB();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With , Content-Type, Accept'
  );
  next();
});

app.use(express.json());
app.use('/api', createUserRouter);
app.use('/api', displaydataRouter);
app.use('/api', orderdataRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
