const express=require('express');
var app=express();
const http = require('http').createServer(app);
StudentController = require('./Controller/StudentController');
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
var cors=require('cors');
app.use(cors());
app.use(bodyParser.json());
app.get('/all-Student',StudentController.index);
app.post('/add-Student',StudentController.store);
app.delete('/delete-Student/:id',StudentController.delete);
app.put('/update-Student/:id',StudentController.update);
app.get('/edit-Student/:id',StudentController.getid);
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:4200']
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
http.listen(3001, () => {
  console.log('listening on *:3000');
});