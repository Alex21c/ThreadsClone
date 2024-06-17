import e from "express";
import 'dotenv/config'
import morgan from "morgan";
import UserRouter from "./Routes/UserRoutes.mjs";
import mongoose, { mongo } from "mongoose";

const app = new e();

// connecting to db
  mongoose.connect(process.env.MONGODB_CONNECTION_STRING_LOCALHOST)
  .then(()=>{
    console.log('Connection established with Database!');
  })
  .catch((err)=>{
    console.log('Unable to connect to DB! ERROR: ', err.message);
    console.log('Exiting...');
    process.exit(1);
  });
// CORS
  app.use((req, res, next) => {
    if (req.headers.host.includes('localhost')) {
      // console.log('its localhost');
      res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    } else {
      res.header('Access-Control-Allow-Origin', 'https://frontend-m6node-file-sharing-application.vercel.app');
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });



// allowing json to be parsed in req.body
  app.use(e.json())

// Request logging using morgan
  app.use(morgan('dev'));

// linking Router
  app.use('/api/v1/user',  UserRouter);

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