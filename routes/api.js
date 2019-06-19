/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const expect = require('chai').expect;
const MongoClient = require('mongodb');
const ObjectId = require('mongodb').ObjectID;
const issueSchema = require("../models/issue");
const mongoose = require('mongoose');

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});
mongoose.connect(process.env.DB, { useNewUrlParser: true })

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get((req, res) => {
      const project = req.params.project;
      const query = req.query;
      const Issue = mongoose.model(project, issueSchema);
      Issue.find(query).then(issues => {
        res.json(issues);
      }).catch(err => {
        console.log(err);
      })
    })
    
    .post((req, res) => {
      const project = req.params.project;
      const { issue_title, issue_text, created_by, assigned_to, status_text } = req.body;
      const Issue = mongoose.model(project, issueSchema);
      const newIssue = new Issue({
         issue_title, 
         issue_text, 
         created_by, 
         assigned_to, 
         status_text, 
         open: true
      });
      newIssue.save().then(result => {
        res.json(result);
      }).catch(err => {
        console.log(err);
      })
    })
    
    .put((req, res) =>{
      const project = req.params.project;
      const { _id, issue_title, issue_text, created_by, assigned_to, status_text } = req.body;
      const open = req.body.open ? false : true;
      const Issue = mongoose.model(project, issueSchema);  
      Issue.findById({_id}).then(issue => {
        if(!issue) {
          res.json("There is no issue by this id");
        }
        issue.issue_title = issue_title ? issue_title : issue.issue_title;
        issue.issue_text = issue_text ? issue_text : issue.issue_text;
        issue.created_by = created_by ? created_by : issue.created_by;
        issue.assigned_to = assigned_to ? assigned_to : issue.assigned_to;
        issue.status_text = status_text ? status_text : issue.status_text;
        issue.open = open;
        
        issue.save().then(result => {
          res.json(result);
        }).catch(err => console.log(err))
      }).catch(err => console.log(err));
    })
    
    .delete((req, res) =>{
      console.log("iiii")
      const project = req.params.project;
      const { _id } = req.body;
      const Issue = mongoose.model(project, issueSchema);
      Issue.findByIdAndRemove({_id}).then(result => {
        res.json(result._id + " is deleted");
      }).catch(err => {
        console.log(err);
      })
    });
    
};
