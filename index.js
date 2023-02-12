const express=require('express')
const http=require('http');
const app=express();
const server=http.createServer(app);
const io=socketio(server);

io.on('connection',(socket)=>{
    console.log('a user connected',socket.id);

    socket.on('from client',()=>{
        console.log('event getting from client')
    })
})
app.use('/',express.static(__dirname+'public'));
app.listen(3000,()=>{
    console.log("server starting ")
})