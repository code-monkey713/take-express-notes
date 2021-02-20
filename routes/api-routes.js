// const tableNote = require('../db/table-note');

const fs = require('fs');
// const { finished } = require('stream');
const data = fs.readFileSync('./db/db.json');
let notesData = JSON.parse(data);

module.exports = (app) => {
  app.get('/api/notes', (req, res) => {
    res.json(notesData);
  });
  
  
  app.post('/api/notes', (req, res) => {
    const newNotes = req.body;

    notesData.push(req.body);
    const jnotes = JSON.stringify(notesData, null, 2);
    fs.writeFile('./db/db.json', jnotes, finished);
    
    function finished(err){
      console.log('JSON file updated!');
    }

    console.log(jnotes);
    res.json(newNotes);
  });

  app.delete('/api/notes/:id', (req, res) => {
    // this is the function for deleting a note from the 
    const deleteID = req.params.id;
    console.log(deleteID);
    
    
    for (let i = 0; i < notesData.length; i++) {
      if (deleteID === notesData[i].id) {
        // return res.json(notes[i]);
        console.log(notesData[i]);
      }
    }

    res.end();
  });

  app.post('/api/clear', (req, res) => {
    notesData.length = 0;

    res.json({ ok: true });
  });
}