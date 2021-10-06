const express = require('express');
const routes = express.Router();
const cors = require('cors')

const CallerControler = require('./controlers/CallerControler')
const MemberControler = require('./controlers/MemberControler')
const QueueControler = require('./controlers/QueueControler')
const ReportControler = require('./controlers/ReportControler')


const corsOptions = {
    origin: 'http://localhost:3000',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
 }
  
  
//caller routes
routes.post('/callers/all',cors(corsOptions),  CallerControler.all);
routes.post('/callers/addCaller',cors(corsOptions),  CallerControler.addCaller);
routes.post('/callers/setQueue', cors(corsOptions), CallerControler.setQueue);
routes.post('/callers/setMember', cors(corsOptions), CallerControler.setMember);


routes.get('/callers/:page/:limit',cors(corsOptions),CallerControler.list);
routes.get('/callers/:uid',cors(corsOptions),CallerControler.getCaller);

// member routes
routes.get('/members', cors(corsOptions), MemberControler.list);
routes.post('/member/addMember', cors(corsOptions),  MemberControler.insertMember);

//report routes
routes.get('/report',cors(corsOptions), ReportControler.show);

//queue routes
routes.post('/queues/addCaller', cors(corsOptions), QueueControler.addCaller);

//routes.post('/queues',QueueControler.store);
routes.post('/queues/addQueue', cors(corsOptions), QueueControler.addQueue);
routes.post('/queues/addMember',cors(corsOptions), QueueControler.addMember);
routes.get('/queues', cors(corsOptions),  QueueControler.listQueues);
routes.delete('/queues/removeMember', cors(corsOptions),  QueueControler.removeMember);
routes.get('/queues/listMembers', cors(corsOptions), QueueControler.listMembers);



module.exports = routes;