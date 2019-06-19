const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
  // _id: {
  //   type: String,
  //   required: true
  // },
  issue_title: {
    type: String,
    // required: true
  },
  issue_text: {
    type: String,
    // required: true
  },
  created_by: {
    type: String,
    // required: true
  },
  assigned_to: {
    type: String
  },
  status_text: {
    type: String
  },
  open: {
    type: Boolean
  }
},{timestamps: { createdAt: 'created_on', updatedAt: 'updated_on' }})

module.exports = issueSchema;