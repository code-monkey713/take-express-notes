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

  // app.get('/api/notes', (req, res) => res.json(__dirname + '/db/db.json'));
  // app.get('/api/notes', (req, res) => res.json(notes));

  app.get('/api/notes', (req, res) => res.json(tableNote));
  
  app.post('/api/notes', (req, res) => {
    const newNotes = req.body;
    // newNotes.id = newNotes.title.replace(/\s+/g, '').toLowerCase();
    console.log(newNotes);

    // console.log(tableNote);
    tableNote.push(req.body);
    res.json(newNotes);
  });

// app.get('/api/notes/:notes', (req, res) => {
//   const chosen = req.params.notes;
//   console.log(chosen);

//   for (let i = 0; i < notes.length; i++) {
//     if (chosen === notes[i].routeName) {
//       return res.json(notes[i]);
//     }
//   }
//   return res.json(false);
// });

  app.post('/api/clear', (req, res) => {
    tableNote.length = 0;
  });
}