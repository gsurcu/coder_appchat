const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)
const { productos } = require('./data/data');
const path = require("path");
const rutasApi = require('./routers/index');

let chat = [];
// Middlewares
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
// Rutas
app.use('/api', rutasApi);

app.get('/', (req,res) => {
  console.log("Ok")
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
