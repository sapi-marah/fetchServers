# FETCH SERVERS
### What is FETCH Servers
FETCH Servers is a server created by Ian C. Vu that runs on Github Codespaces. This uses FETCH APIs to receive data. FETCH Servers uses Node.js libaries such as `express`, `argon2`, and `cors`.
### Setting up FETCH Servers
#### Creating a server
Sending and retrieving require creating a server using FETCH Servers. Since FETCH Servers run on API requests, you'd need to just send a simple JavaScript Fetch API to create a new server.
```javascript
let response = await fetch("", {
  method : "POST",
  headers: {
    "Content-Type" : "application/json"
  },
  body : JSON.stringify({
    key : "<your_password>" //  Set the password to modify the server
  });
});
```
After the script is ran, you need to get the Server ID so you can access it.
```
console.log(await response.text());
```
After you run it, it should output `Your server has been created\nYour Server id is: <your_server_id>`. Copy the Server ID to access the server later. If it didn't output the same text as we said it did then try it again or create an issue in this Github Repo.
#### Sending and retrieving
##### Sending data
Sending data is pretty easy. It requires the Server ID and key (password) to modify the server. You just need to send a JavaScript FETCH API to the port.
```javascript
let response = await fetch("", {
  method : "POST",
  "headers" : {
    "Content-Type" : "application/json"
  },
  body : JSON.stringify({
    key : "<your_key_or_password>",
    id : "<your_server_id>",
    data : {} //  Data you want to send
  });
});
```
#### Retrieving Data
To retrieve data from the server, instead of using a FETCH POST API we'd need to use the GET API. And also, since there's gonna be more than one server we'd need a `for() {}` loop to check the servers.
