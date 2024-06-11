require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const db = require("./database/db")
const { createServer } = require("http");
const { Server } = require("socket.io");


const port = 5000

const app = express();



app.use(cors(
    {
        origin: ["http://localhost:3000","http://192.168.8.102"],
        credentials: true
    }
))


app.use(cookieParser())
   
app.use(express.json())

app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(bodyParser.json({limit: '10mb'}));

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

// Any 
app.get('/', (req, res) => res.send('Home MMT'))

httpServer.listen(port, () => console.log(`Server is running on port ${port}!`))


 db.connect((err)=>{
    if(err) return console.log(err)
    console.log('DataBase Connected')
}) 