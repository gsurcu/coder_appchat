const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)

app.use(express.static('./public'))
let chat = [];

app.get('/', (req,res) => {
  console.log("")
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', socket => {
  emitir()
  socket.on("incomingMessage", message =>{
    chat.push(message)
    emitir()
  })
})

const emitir = () => io.sockets.emit("chat", chat)

server.listen(3000, () => { console.log(`Running on port: ${3000}`)})
