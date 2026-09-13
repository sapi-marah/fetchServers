const express = require('express');
const cors = require('cors');
const server = express();
const argon2 = require('argon2');
server.use(express.json());
server.use(cors());
let data = [];
server.get('/', function(req, res) {
  res.json(data);
});
server.post('/newServer', async function(req, res) {
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
      return createServer();
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
  let exists = false;
  let selectedServer = undefined;
  for (let srver of data) {
    if (srver.id === req.body.id) {
      if (await argon2.verify(srver.key, req.body.key) === true) {
        selectedServer = srver;
        exists = true;
        break;
      }
    }
  }
  if (exists === true) {
    selectedServer.data.push(req.body.data);
    return res.status(200).send("Data has been sent");
  } else if (exists === false) {
    return res.status(404).send("Invaild Server ID or key.");
  }
});
server.listen(3000);
