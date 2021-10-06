const express =require('express')
const routes = require('./routers')
const cors = require('cors')
require('./database/index')

const app = express()

app.listen(3333)

app.use(function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "http://localhost:8080"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
       res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });
app.use(express.json())
app.use(routes)
