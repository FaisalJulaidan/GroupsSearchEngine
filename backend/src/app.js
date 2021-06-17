const express = require('express');
const app = express();
require('dotenv').config();

const fs = require('fs');
const csv = require('csv-parser');

app.get('/', (req, res, next) => {
 res.send('Hello World!')
});


// Search by keywords | params e.g. ?keywords=["skype","boxer"]
app.get('/groups/keywords', (req, res, next) => {
  let keywords = req.query['keywords']
  let groups = [];

  if (!keywords) res.status(500).send({ error: 'Something failed!' })


  // const keywords = JSON.parse(req.query['keywords']);

});






const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});