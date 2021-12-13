const socket = io();

socket.on('evento', data =>{
    console.log(data)
    let p = document.createElement("p")
    p.innerText = data
    document.getElementById('chat').appendChild(p)  
})
document.getElementById('btn').onclick = ()=>{
    socket.emit('evento', document.getElementById('input').value)
}
/* setInterval(()=>{
    socket.emit('evento', `[${new Date().toLocaleTimeString()}]Datos enviados desde el cliente al servidor`)
 }, 2000) */
