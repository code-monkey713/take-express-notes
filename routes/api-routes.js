// const tableNote = require('../db/table-note');

const fs = require('fs');
// const { finished } = require('stream');
const data = fs.readFileSync('./db/db.json');
let notesData = JSON.parse(data);

module.exports = (app) => {
  app.get('/api/notes', (req, res) => {
    res.json(notesData);
  });
  
  function writeToJSONfile(){
    const noteChanged = JSON.stringify(notesData, null, 2);
    fs.writeFile('./db/db.json', noteChanged, finished);
    
    function finished(err){
      console.log('JSON file updated!');
    }
  };
  
  app.post('/api/notes', (req, res) => {
    const newNotes = req.body;

    notesData.push(req.body);
    writeToJSONfile();
    // const jnotes = JSON.stringify(notesData, null, 2);
    // fs.writeFile('./db/db.json', jnotes, finished);
    
    // function finished(err){
    //   console.log('JSON file updated!');
    // }

    console.log(jnotes);
    res.json(newNotes);
  });

  app.delete('/api/notes/:id', (req, res) => {
    // this is the function for deleting a note from the 
    const deleteID = req.params.id;
    console.log(deleteID);
    
    
    for (let i = 0; i < notesData.length; i++) {
      if (deleteID === notesData[i].id) {
        // console.log(notesData[i]);
        notesData.splice(i, i);
        console.log(notesData);
        // writeToJSONfile();
        // const deletedNotes = JSON.stringify(notesData, null, 2);
        // fs.writeFile('./db/db.json', deletedNotes, finished);
        // function finished(err){
        //   console.log('JSON file updated!');
        // }
      }
    }

    res.end();
  });

  app.post('/api/clear', (req, res) => {
    notesData.length = 0;

    res.json({ ok: true });
  });
}