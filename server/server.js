const express = require('express');
const mongoose = require('mongoose');
const note = require('./models/note');
const auth = require('./middleware/auth');
const app = express();


app.use(express.json());


mongoose.connect(process.env.DB_PATH, {
  dbName: 'smart_noter',
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to the DB.");
}).catch((err) => console.log("Error connecting to the database."));

app.all('/api/*', auth);

app.use('/api/notes', require('./routes/notes'));
app.use('/api/auth', require('./routes/auth'));


app.listen(process.env.PORT || 5000, () => console.log(`Listening on Port ${API_PORT}`));