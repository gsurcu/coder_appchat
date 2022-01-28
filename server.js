const express = require('express')
const http = require('http')
const app = express()
const path = require("path");
const { engine } = require('express-handlebars')

const { productos } = require('./data/data');
const rutasApi = require('./routers/index');

const server = http.createServer(app)
const io = require('socket.io')(server)
let chat = [];

// Middlewares
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

// Template Engines
app.engine(
  'hbs',
  engine({
    extname: 'hbs',
    defaultLayout: 'main.hbs',
    layoutsDir: path.resolve(__dirname, './view/layouts'),
    partialsDir: path.resolve(__dirname, './view/partials'),
  })
);
app.set("view engine", "hbs");
app.set("views", path.resolve(__dirname, "./view"));

// Rutas
app.use('/api', rutasApi);

app.get('/', (req, res) => {
  res.render('index.hbs', {
    mostrarProductos: false,
    productos,
    info: [{name:'nombre'},
    {name:'precio'},
    {name:'imagen'},
    {name:'descripcion'}],
  });
});

app.get('/productos', (req, res) => {
  res.render('index', {
    mostrarProductos: true,
    productos,
  });
});

io.on('connection', socket => {
  emitir()

  socket.on("incomingMessage", message =>{
    chat.push(message)
    emitir()
  })
})

const emitir = () => io.sockets.emit("chat", chat)

server.listen(3000, () => { console.log(`Running on port: ${3000}`)})
