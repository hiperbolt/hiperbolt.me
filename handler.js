const { json } = require("express");

module.exports = {
  handle: function (args, socket) {

    var entriesObj = require("./entries.json");

    var firstArg = args.replace(/ .*/,'');

    switch (firstArg) {
      case "ls":
        console.log(entriesObj);
        socket.emit('response', "");
        for (i in entriesObj) {
          socket.emit('response', i);
          console.log(i);
        }
        socket.emit('response', "end-stream");
        break;
      
      case "cat":
        var file = args.split(' ')[1];
        console.log(entriesObj[file]['title']);
        socket.emit('response',"\n" + entriesObj[file]['title']);
        socket.emit('response', "\n" + entriesObj[file]['text']);
        break;

      default:
        break;
    }
  }
};
