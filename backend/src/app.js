/*
 * TODO:
 *  1. creat flexsearch document index [] (DONE)
 *  2. Load csv file into the index [] (DONE)
 *  3. receive keywords using route /search?keywords [X] (DONE)
 *  4. perform search using index [] -- needs to search using multiple keywords and not just one
 *  5. return top 20 []
 */
require('dotenv').config();

const express = require('express');
const app = express();
const csv = require('csv-parser');
const fs = require('fs');

//Build in-memory groups index
const elasticlunr = require('elasticlunr');
const index = elasticlunr(function() {
  this.addField('name');
  this.addField('keywords');
  //this.setRef('id') //default
});
buildIndex();


app.get('/', (req, res, next) => {
  res.send('Hello World!');
});


//Search by keywords | params e.g. ?keywords=["skype","boxer"]
app.get('/search', async (req, res, next) => {
  let keywords = req.query['keywords'];
  if (!keywords) {
    return res.status(500).send({ error: 'Something failed!' });
  }
  console.log('Keywords: ', keywords);

  //returns an array of { ref: '2', score: 0.65 }. ref = id
  const result = index.search(keywords, {
    fields: {
      name: { boost: 3 }, // group name get more score when matched
      keywords: { boost: 1 },
    },
  });
  console.log('results ', result);

  const groups = getGroupsByIds(result);
  console.log('results ', groups);

  return res.json(groups);
});




//Read groups csv rows and add them as docs to the search index
function buildIndex() {
  console.info('building index...');
  fs.createReadStream('src/data/groups.csv')
    .pipe(csv())
    .on('data', (group) => index.addDoc(group));
}

//Get the groups from the index using ref = id
function getGroupsByIds(searchResult) {
  const groups = [];
  searchResult.forEach(res => {
    const doc = index.documentStore.getDoc(res.ref);
    doc.score = res.score;
    groups.push(doc);
  });
  return groups;
}


// ------------- Start Server -------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});