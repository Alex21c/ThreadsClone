import e from "express";
import 'dotenv/config'
import morgan from "morgan";
import UserRouter from "./Routes/UserRoutes.mjs";
import ThreadRouter from "./Routes/ThreadRoutes.mjs";
import ReplyRouter from "./Routes/ReplyRoutes.mjs";
import SearchRouter from "./Routes/SearchRoutes.mjs";
import mongoose, { mongo } from "mongoose";
import passport from "./Passport/passport-config.mjs";
import cors  from 'cors';

const app = new e();

// connecting to db
  mongoose.connect(process.env.MONGODB_CONNECTION_STRING_ATLAS)
  .then(()=>{
    console.log('Connection established with Database!');
  })
  .catch((err)=>{
    console.log('Unable to connect to DB! ERROR: ', err.message);
    console.log('Exiting...');
    process.exit(1);
  });

// CORS
  // app.use((req, res, next) => {
  //   if (req.headers.host.includes('localhost')) {
  //     // console.log('its localhost');
  //     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  //   } else {
  //     res.header('Access-Control-Allow-Origin', 'https://threads-clone-weld-ten.vercel.app/');
  //   }
  //   res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  //   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');    
    
  //   next();
  // });
  const corsOptions = {
    origin: (origin, callback) => {
      if (!origin || origin.includes('localhost:3000') || origin.includes('https://threads-clone-weld-ten.vercel.app')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    allowedHeaders: ['Authorization', 'Content-Type'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));


// allowing json to be parsed in req.body
  app.use(e.json())

// Request logging using morgan
  app.use(morgan('dev'));

// linking passport
  app.use(passport.initialize());

// linking Routers
  app.use('/api/v1/user',  UserRouter);
  app.use('/api/v1/thread',  ThreadRouter);  
  app.use('/api/v1/reply',  ReplyRouter);  
  app.use('/api/v1/search',  SearchRouter);  

  


// Default Error handling middleware
  app.use((err, req, res, next)=>{
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Internal Server Error"
    })
  });


const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=> {
  console.log(`Express server is running at port ${PORT}!`);
})