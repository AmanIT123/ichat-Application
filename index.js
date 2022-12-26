// Node server which will handle socket io connections
const io = require('scoket.io')(8000)

const users = {};

io.on('connection', socket=>{
    // If any new user joins, let other users connected to the server khow!
    socket.on('new-user-joined', name =>{
        console.log("New user", name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined', name);
    });
    
    //If someone sends a message, broadcast it to other people
    socket.on('send', Message =>{
        socket.broadcast.emit('receive', {message: message, name:  users[socket.id]})
    });

    // If someone leaves the chat, let others khow
    socket.on('disconnect', Message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });

})

