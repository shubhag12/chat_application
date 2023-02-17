var socket = io();

let btn=document.getElementById('btn');
btn.onclick=function exec(){
    console.log('shubh');
    socket.emit('from_client')
    
}
socket.on('from_server',()=>{
    console.log('connecting a new element from server')
    const div=document.createElement('div');
    div.innerText= 'element from server';
    document.body.appendChild(div);
})