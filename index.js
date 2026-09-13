const express = require('express');
const cors = require('cors');
const server = require('express');
const argon2 = require('argon2');
server.use(express.json());
server.use(cors());
let data = [];
server.get('/', function(req, res) {
  res.json(data);
});
server.post('/newServer', function(req, res) {
  function createServer() {
    var id = Math.floor(Math.random() * 1000000);
    id = id.toString();
    let srverExists = false;
    for (let srver of data) {
      if (srver.id === id) {
        srverExists = true;
      }
    }
    if (srverExists === true) {
      createServer();
      //Server id already exists.
    } else if (srverExists === false) {
      data.push({
        "id" : id,
        "key" : argon2.hash(req.body.key)
      });
      return id;
    }
  }
  let id = createServer();
  return res.status(200).send("Your server has been created\nYour Server id is: " + id);
});
