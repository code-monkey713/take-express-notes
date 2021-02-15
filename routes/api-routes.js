const tableNote = require('../db/table-note');
const fs = require('fs');

module.exports = (app) => {
  let notes = [];
  // fs.readFile(path.join(__dirname + '../db/db.json'), (err, data) => {
  //   if (err) throw err;
  //   let noteJson = JSON.parse(data);
  //   // console.log(noteJson);
  //   tableNote = noteJson;
  //   // console.log(notes);
  // });

  app.get('/api/notes', (req, res) => res.json(tableNote));
  
  app.post('/api/notes', (req, res) => {
    tableNote.push(req.body);
  });
  
  app.post('/api/clear', (req, res) => {
    tableNote.length = 0;
  });
}