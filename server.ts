import { Request, Response, NextFunction } from "express";

const express = require('express')
require('dotenv').config()

const { connect } = require('./db')
const example = require('./routes/example')
const postsRoutes = require('./routes/posts');
const worksRoutes = require('./routes/works');
const portfoliosRoutes = require('./routes/portfolios');
const bodyParser = require('body-parser');

const dev = process.env.NODE_ENV !== 'production'

const apiString = process.env.API_STRING || "/api/v1/"

const app = express();
app.use(bodyParser.json());
app.use(`${apiString}example`, example)
app.use(`${apiString}posts`, postsRoutes)
app.use(`${apiString}works`, worksRoutes)
app.use(`${apiString}portfolios`, portfoliosRoutes)

async function runServer() {
      require('./db').connect()
      const port = process.env.PORT || 3001
      try{   
            app.listen(port, (err:Error) => {
                  if (err) throw err
                  console.log(`> Ready on http://localhost:${port}`)
            })
      }
      catch(err){
            console.log(err)
            console.log('Server has crashed?')
      }
}
try{
      runServer()
}
catch(err) {
      console.log("Error with DB?",err);
}
