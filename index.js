const express = require('express');
const cors = require('cors');
const server = require('express');
server.use(express.json());
server.use(cors());
let data = [];
server.get('/', function(req, res) {
  res.json(data);
});
server.post('/newServer', function(req, res) {
  let id = Math.floor(Math.random() * 1000000);
  //use a for() {} to find data
});
