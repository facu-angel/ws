const socket = io();

socket.on('evento', data =>{
    let p = document.createElement("p")
    p.innerText = `producto: ${data.title}, precio: ${data.price}`
    document.getElementById('products').appendChild(p)  
})
document.getElementById('form').onsubmit = (e)=>{
    e.preventDefault()
    const obj = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value
    }
    socket.emit('evento', obj)
}
socket.on('load', array =>{
        document.getElementById('btn-load').onclick = ()=>{
            array.forEach(e => {
                let p = document.createElement("p")
                p.innerText = `producto: ${e.title}, precio: ${e.price}`
                document.getElementById('products').appendChild(p)
            });
        }
    })

//           chat
const mail = []
document.getElementById('btn-confirm').onclick = ()=>{
    const email = document.getElementById('email').value
    mail.push(email)
    document.getElementById('email').remove()
    document.getElementById('btn-confirm').remove()
}
document.getElementById('form-chat').onsubmit = e=>{
    e.preventDefault()
    if(mail.length == 0){
        let p = document.createElement("p")
        p.innerText = `No se puede enviar el fomulario por falta de email`
        document.getElementById('chat').appendChild(p)
    }else{
        const obj = {
            email: mail[0],
            name: document.getElementById('name').value,
            message: document.getElementById('message').value
        }
        socket.emit('chat', obj)
    }
}
socket.on('chat', data =>{
    let p = document.createElement("p")
    p.innerHTML = `<hr>
                    <b style="color: blue">${data.email}</b>
                    <div>
                    <span style="text-decoration: underline;">${data.name}</span>
                    <span>${data.message}:</span>
                    <span>[${new Date().toLocaleTimeString()}]</span>
                    </div> 
                    <hr>   `
    document.getElementById('chat').appendChild(p)  
})
