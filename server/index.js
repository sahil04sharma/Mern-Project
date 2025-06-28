require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./model');

const app = express();
app.use(cors({
  origin: ['https://mern-project-eight-psi.vercel.app/'], // Replace with your actual frontend domain
  credentials: true
}));

app.use(express.json({ limit: '20mb' }));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Mongo error", err));


app.get('/check-username', async (req, res) => {
  const { username } = req.query;
  if (!username) return res.status(400).json({ available: false });

  try {
    const user = await User.findOne({ username: username.toLowerCase() });
    res.json({ available: !user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ available: false });
  }
});


const locationSchema = new mongoose.Schema({
  country: String,
  states: [
    {
      name: String,
      cities: [String]
    }
  ]
});
const Location = mongoose.model('Location', locationSchema);

app.get('/countries', async (req, res) => {
  try {
    const data = await Location.find();
    const countries = data.map(loc => loc.country);
    res.json(countries);
  } catch (err) {
    console.error("Error fetching countries:", err);
    res.status(500).json([]);
  }
});

app.get('/states/:country', async (req, res) => {
  try {
    const country = await Location.findOne({ country: req.params.country });
    res.json(country ? country.states.map(s => s.name) : []);
  } catch (err) {
    console.error("Error fetching states:", err);
    res.status(500).json([]);
  }
});

app.get('/cities/:country/:state', async (req, res) => {
  try {
    const country = await Location.findOne({ country: req.params.country });
    const state = country?.states.find(s => s.name === req.params.state);
    res.json(state ? state.cities : []);
  } catch (err) {
    console.error("Error fetching cities:", err);
    res.status(500).json([]);
  }
});


app.post('/submit', async (req, res) => {
  try {
    const formData = req.body;

    const user = new User(formData);
    await user.save();

    console.log("User saved:", user);
    res.json({ success: true });
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
