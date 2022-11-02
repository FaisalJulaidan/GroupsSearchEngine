/*
 * TODO:
 *  1. creat flexsearch document index [] (DONE)
 *  2. Load csv file into the index [] (DONE)
 *  3. receive keywords using route /search?keywords [X] (DONE)
 *  4. perform search using index [] -- needs to search using multiple keywords and not just one
 *  5. return top 20 []
 */

// ------------- Import Libraries ------------- //
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const csv = require('csv-parser');
const fs = require('fs');

// ------------- Search Index ------------- //
//Build in-memory groups index
const elasticlunr = require('elasticlunr');
const index = elasticlunr(function () {
  this.addField('name');
  this.addField('keywords');
  //this.setRef('id') // exists by default
});
const customized_stop_words = ['group'];
elasticlunr.addStopWords(customized_stop_words);

// build the index by adding the groups' data to memory
buildIndex();

// ------------- Routes ------------- //
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Pass to next layer of middleware
  next();
});

app.get('/h', (req, res, next) => {
  res.send('Hello World!');
});

// Search by keywords | params e.g. ?keywords=skype,boxer
app.get('/search', async (req, res, next) => {
  // res.header('Access-Control-Allow-Origin', '*');
  if (!req.query['keywords']) {
    return res.status(500).send({ error: 'No keywords given' });
  }
  let keywords = req.query['keywords'].split(',');
  console.log(keywords);

  // Returns an array of { ref: '2', score: 0.65 }. ref = id
  const result = index.search(keywords, {
    fields: {
      name: { boost: 3 }, // boost means name get more score when matched
      keywords: { boost: 1 },
    },
  });
  console.log('result ', result);

  const groups = getGroupsById(result);
  console.log('groups ', groups);

  return res.json(groups);
});

// Serve static frontend react app
app.get('*', async (req, res, next) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// ------------- Functions ------------- //
// Read the groups.csv and create the search index in memory (fast)
function buildIndex() {
  console.info('building index...');
  fs.createReadStream('src/data/groups.csv')
    .pipe(csv())
    .on('data', (group) => {
      console.log(group); // print all groups
      index.addDoc(group);
    });
}

//Get the groups from the index using ref = id
function getGroupsById(searchResult) {
  const groups = [];
  searchResult.forEach((res) => {
    const doc = index.documentStore.getDoc(res.ref);
    doc.score = res.score;
    groups.push(doc);
  });
  return groups;
}

// ------------- Start Server -------------
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
