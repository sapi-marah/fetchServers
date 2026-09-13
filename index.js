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
  async function createServer() {
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
        "key" : await argon2.hash(req.body.key),
        "data" : []
      });
      return id;
    }
  }
  let id = await createServer();
  return res.status(200).send("Your server has been created\nYour Server id is: " + id);
});
server.post('/pushData', async function(req, res) {
  for (let srver of data) {
    if (srver.id === req.body.id) {
      if (await argon2.verify(srver.key, req.body.key)) {
        srver.data.push(req.body.data);
        return res.status(200).send("Data has been sent");
      } else {
        return res.status(403).send("Invaild key");
      }
    } else {
      return res.status(404).send("Server does not exist.");
    }
  }
});
