const express=require('express')
const http=require('http');
const app=express();
const server=http.createServer(app);
const socketio=require('socket.io');
const io=socketio(server);

io.on('connection',(socket)=>{
    console.log('a user connected',socket.id);

    socket.on('msg_send',(data)=>{
        console.log(data);
         io.emit('msg_rcvd',data)
    })
   
})
app.use('/',express.static(__dirname+'/public'));
server.listen(3000,()=>{
    console.log("server starting ")
})