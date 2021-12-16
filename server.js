const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('./public'))
app.get('/', (req, res)=>{
    res.sendFile('index.html', {root:__dirname})
})
httpServer.listen(process.env.PORT || 8080)

io.on('connection', (socket)=>{
    //Se ejecuta una vez cuando se conecta el cliente
    console.log('se abrio una nueva coneccion');
    socket.on('evento', data =>{
        //Se ejecuta cuando llega 'data'
        console.log(data)
        io.sockets.emit('evento', data)
    })
})