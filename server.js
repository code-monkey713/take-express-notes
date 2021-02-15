const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.json());

// app.get('/api/notes', (req, res) => res.json(__dirname + '/db/db.json'));
// app.get('/api/notes', (req, res) => res.json(notes));

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

// app.post('/api/notes', (req, res) => {
//   const newNotes = req.body;

//   newNotes.routeName = newNotes.title.replace(/\s+/g, '').toLowerCase();
//   console.log(newNotes);

//   notes.push(newNotes);
//   res.json(newNotes);
// });

require('./routes/api-routes')(app);
require('./routes/html-routes')(app);

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));