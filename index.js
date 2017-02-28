'use strict';

let http = require('http');
let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let path = require('path');

let getPage = require('summarizer').getPage;

let uri = 'http://drexel.edu/coas/faculty-research/faculty-directory/AkeStacey/';
let result_set = require('./CSProfessors');

let results = [];
console.log(`total results :  ${result_set.length}`);

for(let i = 0; i < 2; i++) {
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
  }, console.error);
}
app.get('/results', (req, res) => {
  res.send(results);

})
let server = app.listen(9000, () => {
  	let host = server.address().address;
	let port = server.address().port;
	console.log(`Running Server ... ${port}`);
});
