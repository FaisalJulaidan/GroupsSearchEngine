/*
 * TODO:
 *  1. creat flexsearch document index [] (DONE)
 *  2. Load csv file into the index [] (DONE)
 *  3. receive keywords using route /search?keywords [X] (DONE)
 *  4. perform search using index [] -- needs to search using multiple keywords and not just one
 *  5. return top 20 []
 */

const express = require('express');
const router = express.Router();

const app = express();
require('dotenv').config();

const csv = require('csv-parser');
const fs = require('fs');

const { Index, Document } = require('flexsearch');
// const searchIndex = new Index({ preset: 'score' });
const searchIndex = new Document({
    id: 'id',
    index: ['keywords', 'name'],
    store: ['id', 'groupId', 'name', 'description', 'telephone', 'email', 'keywords'],
});
const groupsData = [];
buildIndex();

app.get('/', (req, res, next) => {
  res.send('Hello World!');
});


// Search by keywords | params e.g. ?keywords=["skype","boxer"]
app.get('/search', async (req, res, next) => {
  let keywords = req.query['keywords'];
  let groups = [];

  // try {
  //   if (searchIndex.length === 0) {
  //     await buildIndex();
  //   }

  if (!keywords) {
    return res.status(500).send({ error: 'Something failed!' });
  }
  console.log('Keywords: ', keywords);

  //search using flexsearch. It will return a list of IDs we used as keys during indexing
  const result = await searchIndex.search({
    query: 'mobility | ', //TODO does not work with multiple words
    enrich: true,
  });
  console.info('resultsIds: ' + result);


  return res.json(result);
});


function getDataByIds(idsList) {
  const result = [];
  const data = groupsData;
  for (let i = 0; i < data.length; i++) {
    if (idsList.includes(parseInt(data[i].id))) {
      result.push(data[i]);
    }
  }
  console.log('getByIds', idsList.includes(1));
  return result;
}

function buildIndex() {
  console.info('building index...');
  fs.createReadStream('src/data/groups.csv') // read groups csv file
    .pipe(csv())
    .on('data', (data) => groupsData.push(data))
    .on('end', () => {
      // add to the index
      for (let i = 0; i < groupsData.length; i++) {
        const content = groupsData[i].name + ' ' + groupsData[i].keywords;
        //console.log(groupsData[i]);
        const key = parseInt(groupsData[i].id);
        searchIndex.add(groupsData[i]);
      }
    });
}


// ------------- Start Server -------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});