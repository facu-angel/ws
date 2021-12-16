const socket = io();

socket.on('evento', data =>{
    let p = document.createElement("p")
    p.innerText = `producto: ${data.title}, precio: ${data.price}`
    document.getElementById('chat').appendChild(p)  
})
document.getElementById('btn').onclick = ()=>{
    
    const obj = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value
    }
    socket.emit('evento', obj)
}
/* setInterval(()=>{
    socket.emit('evento', `[${new Date().toLocaleTimeString()}]Datos enviados desde el cliente al servidor`)
 }, 2000) */
