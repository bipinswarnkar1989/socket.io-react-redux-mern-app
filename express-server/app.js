// ./express-server/app.js
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import SourceMapSupport from 'source-map-support';
import bb from 'express-busboy';
import http from 'http';
import socket from 'socket.io';

// import routes
import todoRoutes from './routes/todo.server.route';

//import controller file
import * as todoController from './controllers/todo.server.controller';

// define our app using express
const app = express();

const server = http.Server(app);
const io = socket(server);

// express-busboy to parse multipart/form-data
bb.extend(app);

// socket.io connection
io.on('connection', (socket) => {
  console.log("Connected to Socket!!"+ socket.id);
  // Receiving Todos from client
  socket.on('addTodo', (Todo) => {
    console.log('socketData: '+JSON.stringify(Todo));
    todoController.addTodo(io,Todo);
  });

  // Receiving Updated Todo from client
  socket.on('updateTodo', (Todo) => {
    console.log('socketData: '+JSON.stringify(Todo));
    todoController.updateTodo(io,Todo);
  });

  // Receiving Todo to Delete
  socket.on('deleteTodo', (Todo) => {
    console.log('socketData: '+JSON.stringify(Todo));
    todoController.deleteTodo(io,Todo);
  });
})

// allow-cors
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  res.io = skt;
  next();
})

// configure app
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, 'public')));


// set the port
const port = process.env.PORT || 3001;

// connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mern-todo-app', {
  useMongoClient: true,
});

// add Source Map Support
SourceMapSupport.install();

app.use('/api', todoRoutes);

app.get('/', (req,res) => {
  return res.end('Api working');
});

// catch 404
app.use((req, res, next) => {
  res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});


// start the server
server.listen(port,() => {
  console.log(`App Server Listening at ${port}`);
});
