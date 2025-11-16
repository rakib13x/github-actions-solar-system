require('dotenv').config();
const path = require('path');
const express = require('express');
const OS = require('os');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.set('debug', true); // Enable mongoose query debug logging
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));
app.use(cors());

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      auth: {
        user: process.env.MONGO_USERNAME,
        password: process.env.MONGO_PASSWORD,
      },
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection successful");

    const port = 3000;
    app.listen(port, () => {
      console.log(`Server successfully running on port - ${port}`);
    });
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

startServer();

const dataSchema = new mongoose.Schema({
  name: String,
  id: Number,
  description: String,
  image: String,
  velocity: String,
  distance: String,
});

const planetModel = mongoose.model('planets', dataSchema);

// Use async/await style only
app.post('/planet', async (req, res) => {
  try {
    const planetData = await planetModel.findOne({ id: req.body.id });
    if (!planetData) {
      return res.status(404).send({ error: "Ooops, We only have 9 planets and a sun. Select a number from 0 - 9" });
    }
    res.send(planetData);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error in Planet Data" });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/', 'index.html'));
});

app.get('/os', (req, res) => {
  res.json({
    os: OS.hostname(),
    env: process.env.NODE_ENV,
  });
});

app.get('/live', (req, res) => {
  res.json({ status: 'live' });
});

app.get('/ready', (req, res) => {
  res.json({ status: 'ready' });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server successfully running on port - ${port}`);
});

module.exports = app;
