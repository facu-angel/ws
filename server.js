const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const Libreria = require('./contenedor')
const libreria = new Libreria()

app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.get('/', (req, res)=>{
    res.sendFile('index.html', {root:__dirname})
})

io.on('connection', (socket)=>{
    //Se ejecuta una vez cuando se conecta el cliente
    console.log(`Se abrio una nueva coneccion a ${new Date().toLocaleTimeString()}`);
    socket.emit('load', libreria.array)
    socket.on('evento', data =>{
        //Se ejecuta cuando llega 'data'
        libreria.insert(data)
        io.sockets.emit('evento', data)
    })
    socket.on('chat', data=>{
        io.sockets.emit('chat', data)
    })
})
httpServer.listen(process.env.PORT || 8080)
