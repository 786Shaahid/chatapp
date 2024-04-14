import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import { Socket } from 'dgram';


const app=express();
const port=8080;
const server=http.createServer(app);

const io= new Server(server,{
    cors:{
        origin:'http://localhost:3000',
        methods:['Get','Post'],
        transports: ['websocket', 'polling']
    }
});
/** Socket Configuration */
  io.on('connection',(socket)=>{
      console.log('connected',socket.id);

      socket.on("sendMessage",(data)=>{
        // console.log(data);
        io.emit("chatMessage",data )
      });

      socket.on('disconnect',()=>{
        console.log("User disconnect",socket.id);
       })
      });



      app.use(express.json({extended:true}));
      app.use(express.urlencoded({ extended: true }));

server.listen(port,()=>{
     console.log(`Server is listening on port :${port}`);
})