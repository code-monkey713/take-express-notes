const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.json());

// data for the file goes here
let notes = [];

fs.readFile(path.join(__dirname + '/db/db.json'), (err, data) => {
  if (err) throw err;
  let noteJson = JSON.parse(data);
  // console.log(noteJson);
  notes = noteJson;
  console.log(notes);
});

// app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

// app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));
// app.get('/api/notes', (req, res) => res.json(__dirname + '/db/db.json'));
app.get('/api/notes', (req, res) => res.json(notes));

app.get('/api/notes/:notes', (req, res) => {
  const chosen = req.params.notes;
  console.log(chosen);

  for (let i = 0; i < notes.length; i++) {
    if (chosen === notes[i].routeName) {
      return res.json(notes[i]);
    }
  }
  return res.json(false);
});

app.post('/api/notes', (req, res) => {
  const newNotes = req.body;

  newNotes.routeName = newNotes.title.replace(/\s+/g, '').toLowerCase();
  console.log(newNotes);

  notes.push(newNotes);
  res.json(newNotes);
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
