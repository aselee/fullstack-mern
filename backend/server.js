const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');

const API_PORT = 3001;
const app = express();
const router = express.Router();

// this is our MongDb database
const dbRoute = "mongodb://<lee79924>:<Mern79924>@ds229458.mlab.com:29458/medium-mern-pract";

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//(optional) only made for logging and 
// bodyParser, parses the request body to be a readable json format

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// Get method
// this method fetches all available data in our database
router.get("/getData", (req, res) => {
  Data.find((err, data) => {
    // if error returns false, show as error
    // return true if data is successfully fetched
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// Update method
// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
  const { id, update } = req.body;
  Data.findOneAndUpdate(id, update, err => {
    // if error return false
    // return updates if true
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// Delete method
// this method removes exisiting data in our database

router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Data.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true});
  });
});

// Create method
// this method adds new data in our database

router.post("/putData", (req, res) => {
  let data = new Data();

  const { id, message } = req.body;

  if ((!id && id !==0) || !message) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.message = message;
  data.id = id;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use ("/api", router);

//launch our back end into an port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));