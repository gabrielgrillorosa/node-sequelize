const express = require('express');
const routes = express.Router();


const CallerControler = require('./controlers/CallerControler')
const MemberControler = require('./controlers/MemberControler')
const QueueControler = require('./controlers/QueueControler')
const ReportControler = require('./controlers/ReportControler')

/*

var corsOptions = {
    origin: 'http://localhost:8080',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204

  }
  */
  
//caller routes
routes.post('/callers/addCaller',  CallerControler.addCaller);
routes.post('/callers/setQueue',  CallerControler.setQueue);
routes.post('/callers/setMember', CallerControler.setMember);
routes.get('/callers',  CallerControler.list);
routes.get('/callers/:ui',  CallerControler.getCaller);

// member routes
routes.get('/members', MemberControler.list);
routes.post('/member/addMember',  MemberControler.insertMember);

//report routes
routes.get('/report', ReportControler.show);

//queue routes
routes.post('/queues/addCaller',  QueueControler.addCaller);

//routes.post('/queues',QueueControler.store);
routes.get('/queues', QueueControler.listQueues);
routes.post('/queues/addMember',  QueueControler.addMember);
routes.get('/queues',  QueueControler.listQueues);
routes.delete('/queues/removeMember',  QueueControler.removeMember);
routes.get('/queues/listMembers', QueueControler.listMembers);



module.exports = routes;