import { StringDecoder } from 'string_decoder';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// this will be our database's data structure
const DataSchema = new Schema(
  {
    id: Number,
    message: String
  },
  { timestamps: true }
);

// export the new Schema so we can modify it using Node.js
module.exports = mongoose.model("Data", DataSchema);