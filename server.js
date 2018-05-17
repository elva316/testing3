
const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const session = require('express-session');
const port = process.env.PORT || 8000;
const server = app.listen(port, function() {
    console.log("listening on port 8000");
   });
const io = require('socket.io').listen(server);


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session({secret: 'codingdojorocks'}));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './static')));
app.use(express.static(path.join(__dirname, './public/dist')));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

const users = [];
io.sockets.on('connection', function (socket) {
    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);
    // all the server socket code goes in here
    socket.on('login', function(data){
        var user = {
            info: data.user,
            id: socket.id,
        }
        users.push(user);
        io.emit('online', {users:users});
    })

    socket.on('disconnect', function(){
        console.log("dis id is: ", socket.id);
        var rest_user = users.filter(function(el){
            return el.id != socket.id;
        })
        users = rest_user;
        io.emit('online',{users:users});
    })
  })
