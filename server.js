const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(__dirname + "/public"));
app.use(express.json());

// data for the file goes here
const notes = [
  {
    routeName: "test1",
    title: "test1",
    text: "test1",
  },
  {
    routeName: "test2",
    title: "test2",
    text: "test2",
  },
]

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));
// app.get('/css', (req, res) => res.sendFile(path.join(__dirname, './public/assets/css/styles.css')));
// app.get("/public", express.static(__dirname + "/public"));
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
