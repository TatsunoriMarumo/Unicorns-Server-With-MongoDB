// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb+srv://Tatsunori:6tqLk2xsR6i6aeKD@cluster0.vnq99vl.mongodb.net/?retryWrites=true&w=majority');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const unicornSchema = new mongoose.Schema({
  name: String,
  loves: [String],
  weight: Number,
  gender: String,
  vampires: Number,
  vaccinated: Boolean
});

const unicornModel = mongoose.model('unicorns', unicornSchema);

const express = require('express');
const cors = require("cors");
const app = express();
app.use(cors());
const port = 3000;

app.get('/unicorns', async (req, res) => {
  try {
    const unicornsQuery = {}
  if (req.query.name) {
     unicornsQuery["name"] = req.query.name
  }

  if (req.query.gender) {
    if(req.query.gender !== "any") {
      unicornsQuery["gender"] = req.query.gender === "male" ? "m" : "f"
    }
  }

  if(req.query.loves) {
    unicornsQuery["loves"] = { $in :[req.query.loves] }
  }

  if(req.query.weight && req.query.weightFilter === "greater than") {
    unicornsQuery["weight"] = { $gt: req.query.weight }
  } else if(req.query.weight && req.query.weightFilter === "less than") {
    unicornsQuery["weight"] = { $lte: req.query.weight }
  }

  if(req.query.vampires && req.query.vampiresFilter === "greater than") {
    unicornsQuery["vampires"] = { $gte: req.query.vampires }
  } else if(req.query.vampiresFilter === "vampires exist") {
    unicornsQuery["vampires"] = { $ne: null }
  }

  if(req.query.vaccinated) {
    if(req.query.vaccinated !== "any") {
      unicornsQuery["vaccinated"] = req.query.vaccinated === "Yes" ? true : false
    } 
  }

  if (req.query.dob) {
    if(req.query.dobFilter === "earlier than") {
      unicornsQuery["dob"] = { $lt: new Date(req.query.dob) }
    } else if(req.query.dobFilter === "later than") {
      unicornsQuery["dob"] = { $gte: new Date(req.query.dob) }
    }
  }

  if (req.query.sort) {
    req.query.sort = req.query.sort.split(".")
    if(req.query.sort[1] === "asc") {
      req.query.sort = req.query.sort[0]
    } else if(req.query.sort[1] === "desc") {
      req.query.sort = "-" + req.query.sort[0]
    } else {
      req.query.sort = req.query.sort[0]
  }}
A
  const result = await unicornModel.find(unicornsQuery).sort(req.query.sort);
  res.json(result)  
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

app.use((req, res, next) => {
  res.status(404).json({ message: 'Resource not found' });
});

app.listen(port, () => {
  console.log("server is running")
})
