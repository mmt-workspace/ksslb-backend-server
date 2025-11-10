require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const db = require("./database/db")
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require('path');
const requestIp = require("request-ip")





const port = 8600

const app = express();

 

app.use(cors(
    {
        origin: ["http://localhost:3000","http://localhost:5000","http://192.168.0.107:3000","https://ksslb.mmt-ng.com"],
        credentials: true
    }
))

  
app.use(cookieParser())
   
app.use(express.json())

app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(bodyParser.json({limit: '10mb'}));
//  request-ip middleware
app.use(requestIp.mw());
app.set('trust proxy', true);
const httpServer = createServer(app);

const io = new Server(httpServer, {  

    cors: {
    origin: 'http://192.168.8.102',
    methods:['GET','POST']
  } }
  )


// All Routes Modules 
const auth = require("./route/auth")
const public = require("./route/public")
const {authenticator} = require("./auth/jwt")


 
io.on("connection",(socket)=>{
    // update posted producted
    socket.on("update_client_side_products", (arg) => {
          socket.broadcast.emit("reupdate",arg)
      })
  })


// Auth Route 
app.use('/auth',auth)
 
// Public
app.use("/pub",public)


// Access files
app.use("/get_doc/",express.static(path.join(__dirname,"assets/documents")))
// acces photos
app.use("/get_photo/",express.static(path.join(__dirname,"assets/profile")))



app.use(express.static(path.join(__dirname, 'build')));



app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
}) 
 

httpServer.listen(port, () => console.log(`Server is running on port ${port}!`))


 db.connect((err)=>{
    if(err) return console.log(err)
    console.log('DataBase Connected')
}) 