const express=require('express');
var app=express();
const http = require('http').createServer(app);
StudentController = require('./Controller/StudentController');
var bodyParser=require('body-parser');
ColumnController = require('./Controller/ColumnController');

app.use(bodyParser.urlencoded({extended:true}));
var cors=require('cors');
app.use(cors());
app.use(bodyParser.json());
app.get('/all-Student',StudentController.index);
app.post('/add-Student',StudentController.store);
app.delete('/delete-Student/:id',StudentController.delete);
app.put('/update-Student/:id',StudentController.update);
app.get('/edit-Student/:id',StudentController.getid);
app.post('/add-Next',StudentController.storeNext);
app.post('/add-Child',StudentController.storeChild);
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:4200', 'http://localhost:3000', 'http://localhost:3001', 'http://192.168.7.136:4001','https://pdptappsensor.elb.cisinlive.com']
  }
},{transports: ['websocket']}
);
app.get('/all-Column', ColumnController.index);
app.post('/add-Column', ColumnController.store);
app.delete('/delete-Column/:id', ColumnController.delete);


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
const _app_folder = 'dist/testaskk';
//const app = express();

// ---- SERVE STATIC FILES ---- //
app.get('*.*', express.static(_app_folder, {maxAge: '1y'}));

// ---- SERVE APLICATION PATHS ---- //
app.all('*', function (req, res) {
    res.status(200).sendFile(`/`, {root: _app_folder});
});

http.listen(4001, () => {
  console.log('listening on *:4001');
});