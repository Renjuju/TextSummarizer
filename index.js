'use strict';

let http = require('http');
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let path = require('path');
let elasticsearch = require('elasticsearch');
let jsonfile = require('jsonfile')
let file = '/Users/renju/Developer/node-parser/data.json';
let data = {
  somedata: 4,
  yes: true,
  last: 'helloworld'
};


// let client = new elasticsearch.Client({
//   host: 'eshost',
//   log: 'trace'
// });


// client.ping({
//   // ping usually has a 3000ms timeout
//   requestTimeout: 1000
// }, function (error) {
//   if (error) {
//     console.trace('elasticsearch cluster is down!');
//   } else {
//     console.log('All is well');
//   }
// });


let getPage = require('summarizer').getPage;

let uri = 'http://drexel.edu/coas/faculty-research/faculty-directory/AkeStacey/';
let result_set = require('./CSProfessors');
let results = [];
console.log(`total results :  ${result_set.length}`);

console.log('hello wlrd');
let i = 0;
for(i = 0; i < 3; i++) {
  getPage(result_set[i].Sources1).then(function (data) {
    let result = (data);
    let currentProfInfo = result_set[i];

    result.name = currentProfInfo.Name;
    result.university = currentProfInfo.University;
    result.JoinYear = currentProfInfo.JoinYear;
    result.rank = currentProfInfo.rank;
    result.subfield = currentProfInfo.Subfield;
    result.bachelors = currentProfInfo.Bachelors;
    result.masters = currentProfInfo.Masters;
    result.source = [currentProfInfo.Sources1, currentProfInfo.Sources2, currentProfInfo.Sources3, currentProfInfo.Sources4]
    delete result.text;
    delete result.raw;
    results.push(result);
    console.log(i);
    // let es = {};
    // es.type = 'user';
    // es.index = 'profiles';
    // es.body = result;
    // es.id = i;
    // client.create(es, (err, res) => {
    //   if(err) {
    //     console.log(err);
    //     return
    //   }
    //   console.log(res);
    // });
  });
}


app.get('/results', (req, res) => {
  jsonfile.writeFile(file, results , (err)=> {
    console.log(err);
  });
  res.send(results);
})

let server = app.listen(9000, () => {
  	let host = server.address().address;
	let port = server.address().port;
	console.log(`Running Server ... ${port}`);
});
