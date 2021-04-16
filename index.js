var app = require('express')();
var path = require('path');
const { handle } = require('./handler.js');

var http = require('http').createServer(app);
var io = require('socket.io')(http);

var handler = require('./handler.js');

app.get('/xterm/xterm.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/xterm/xterm.css'));
});

app.get('/xterm/xterm.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/xterm/xterm.js'));
});

// On connection to main page, deliver index.html
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


// Main server-side logic
io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('command', (msg) => {
    console.log('command: ' + msg);
    handler.handle(msg, socket);
  });
});

http.listen(8080, () => {
  console.log('listening on *:8080');
});
