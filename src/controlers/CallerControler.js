const Caller = require('../models/Caller');
const Member = require('../models/Member')
const Queue = require('../models/Queue')
const { Op } = require ('sequelize')

module.exports = {
    async list (_req, res){
        const callers = await Caller.findAll({
            include: [ { association: 'member', attributes: ['name'] } ,
            {   association: 'queue', attributes: ['name', 'sid'] } 
        ]       
    });
       
        return res.json(callers)

    },
    async getCaller (req, res, _next){
        const  { uid } = req.params;
        const caller = await Caller.findOne({
            attributes: ['uid', 'status','position'],
            where : {uid},
            include: [ { association: 'member', attributes: ['name'] } ,
            { association: 'queue', attributes: ['name'] } 
            ]       
        });
        return res.json(caller)

    },


    async setMember (req, res){
        const { uid, name  } = req.body.params;
        const member = await Member.findOne({
            where: {name}
        })
        
        if(!member) {
            res.status(400).json({error: "Member do not exist"})
        }
        const caller = await Caller.findByPk(uid)
        if(!caller) {
            res.status(400).json({error: "Caller do not exist"})
        }
        await caller.setMember(member)
        //await member.addCallers(caller) // os dois funcionam e sao criados pela relação do sequelize
        return res.json(caller)
    },

    async setQueue(req, res){
      
        const { uid, name } = req.body.queue;
        
        const queue = await Queue.findOne({
              where: {name}
        });
        if(!queue) {
            return res.status(400).json({error: "Queue do not exist for insert caller"})
        }

        
        const caller =  await Queue.findByPk(uid).catch(function (_e) {
        //caller.set('createdAt',moment("2016-04-27"))
                      
           return  res.status(400).json({error: 'Dont create Caller (DUPLICATE):'})
            
            
        }).finally(function()
        {
           

        })
                    
        caller.setQueue(queue)        
        .then(function(caller) { 
           console.log(caller)                        
        })
        .catch(function(erro) { 
           return res.status(400).json({error: erro})
        })
        .finally(function() { 
            
            console.log("Set Queue for Caller Fininally!");
     
        })    
    },

    async addCaller(req, res){
        const { position, status, chan, uid  } = req.body.caller
        const queue_name = req.body.caller.queue      
        const queue = await Queue.findOne({
            where: {name: queue_name}
        });
        if(!queue) {
          return res.status(400).json({error: "Queue do not exist for insert caller"})
        }
         
        const caller =  await Caller.create({status, uid, chan, position})
        .catch(function (_e) {
          return res.json(_e)
                        
        }).then(function(caller) { 
            
               queue.addCallers(caller)
               return res.status(500).json(caller)
         })        
        .finally(function()
        {
            

        })
        
    
    }
}
    
