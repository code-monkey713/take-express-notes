// const tableNote = require('../db/table-note');

const fs = require('fs');
// const { finished } = require('stream');
const data = fs.readFileSync('./db/db.json');
let notesData = JSON.parse(data);

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

  app.get('/api/notes', (req, res) => {
    
    res.json(notesData);
  });
  
  
  app.post('/api/notes', (req, res) => {
    const newNotes = req.body;
    // console.log(newNotes);

    notesData.push(req.body);
    const jnotes = JSON.stringify(notesData, null, 2);
    fs.writeFile('./db/db.json', jnotes, finished);
    
    function finished(err){
      console.log('JSON file updated!');
    }

    // console.log(notesData);
    console.log(jnotes);
    res.json(newNotes);
  });

  app.delete('/api/notes', (req, res) => {
    // this is the function for deleting a note
    console.log(req);
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
    notesData.length = 0;

    res.json({ ok: true });
  });
}