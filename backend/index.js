import env from 'dotenv';
env.config();
import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import path from 'path';


const app=express();
const port=process.env.PORT;
const server=http.createServer(app);

/** SERVER CONFIGURATION */

app.use(express.json({extended:true}));
app.use(express.urlencoded({ extended: true }));


/** Socket Configuration */
const io= new Server(server,{
    cors:{
        origin:'http://localhost:3000',
        methods:['Get','Post'],
        transports: ['websocket', 'polling']
    }
});
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
      // console.log('hii',path.join(path.resolve(), "../frontend", "dist"));
    console.log(path.resolve());
      if (process.env.NODE_ENV.trim() === "production") {
          // Serve static files from the client's build/dist folder
          app.use(express.static(path.join(path.resolve(), "frontend", "build")));
          // Route for serving the React app
          app.get("*", (req, res) => {
            return res.sendFile(path.join(path.resolve(), "frontend", "build", "index.html"));
          });
          
        }
      
      // } else {
      //   app.all("/*", (req, res) => {
      //     return res.status(400).json({
      //       success: false,
      //       error: "no api found",
      //     });
      //   });
      // }
      
      

      /** LISTENING THE SERVER */
server.listen(port,()=>{
     console.log(`Server is listening on port :${port}`);
})