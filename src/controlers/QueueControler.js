
const Queue = require('../models/Queue');
const Member = require('../models/Member');
const Caller = require('../models/Caller');
const Statistic = require('../models/Statistc')
const  Moment = require('moment')

module.exports = {

    async listMembers(req, res){
        
        
        const members = await Member.findAll( {
           include: { association: 'queues', attributes: ['name', 'sid'], through: { attributes : [] } }
        });
    
        if(!members) {
             return res.status(400).json({error: "Member do not exist!"});
        }                
        return res.json(members);
    },

    async addQueue (req, res){
       
        const { sid, name,  weight, max } = req.body.queue;
        const { completed,  abandoned, talktime, holdtime, SL,  SLPerf } = req.body.queue;
        const  created_day = new Moment().format('YYYY-MM-DD')
       
        const [ queue, created ] = await Queue.findOrCreate({
            where: {name},
            defaults:  { sid, name,  weight, max } 
        }).catch( error => {
            console.log(JSON.stringify(error))
            return res.json(error)
        })
    
       if(created) {
           Statistic.create( { completed,  abandoned, talktime, holdtime, SL,  SLPerf, created_day } )
           .catch(  error => {
               console.log(error) 
               return res.json(error)
            }).then( statistic => {
                statistic.setQueue(queue).then( statistic => {
                    return res.json({queue, statistic})
                }).finally(
                        console.log('Set to queue statistic!')
                )
                
            }).finally(
                console.log("Craindo Statistic!")
            )
            
            
         }else
         {
            queue.set('weight',weight )
            queue.set('max', max)

            queue.save({
                 options: {
                    fields: [ weight, max]
                 }
            
             }).catch( error => {
                 console.log(error)
                 return res.json(error)
             })
             
             const statistic = await Statistic.findOne({
                where:{created_day:created_day, queue_id:queue.get('id')}
             }).catch( error => {
                 console.log(error)
                 return res.json(error)
             })

             if(statistic)
             {
                statistic.set({completed,  abandoned, talktime, holdtime, SL,  SLPerf})
                statistic.save({
                    options: {
                        fields: [ completed,  abandoned, talktime, holdtime, SL,  SLPerf]
                    }
                 }).catch( error => {
                     console.log(error)
                     return res.json(error)
                 })
                 return res.json({queue, statistic})

             }else{
                 
                Statistic.create( { completed,  abandoned, talktime, holdtime, SL,  SLPerf, created_day } )
                .catch(  error => {
                    console.log(error) 
                    return res.json(error)
                    }).then( statistic => {
                        statistic.setQueue(queue)
                        .then( statistic => {
                            return res.json({queue, statistic})
                        }).finally(
                                console.log('Set queue to statistic!')
                        ).catch(error => {
                            console.log(error)
                        })
                        
                    }).finally(
                        console.log("Craindo Statistic!")
                    )
             }
         }
    },

    async listQueues(req, res){
     
        const queues = await Queue.findAll();       
        return res.json(queues);
    },
    
    async addCaller (req, res){
       
        const { queue_name, ui } = req.bod.caller;
        const queue = await Queue.findOne({
                where: { name: queue_name } 
        });
        if(!queue){
            return res.status(400).json({error: "Queue do not exists!"});
        }
        const caller = await Caller.findByPk(ui)
        if(!caller){
            return res.status(400).json({error: "Caller do not exists!"});
        }
        queue.addCaller(caller)
        return res.json(caller)
     },

    async addMember (req, res){
         const { queue_name, member_name } = req.body;
        const member = await Member.findOne({
            where: {name: member_name }
        })
        if(!member){
            return res.status(400).json({error: "Member do not exists!"});
        }
        const  queue  = await Queue.findOne({
            include: { association: 'members', attributes: ['name', 'callsTaken'], through: { attributes : [] } },
            where: { name: queue_name }           
         });
         if(!queue){
            return res.status(400).json({error: "Queue do not exists!"});
        }
         
        member.addQueue(queue);
        return res.json({queue});
    },

    async removeMember(req, res){
       const { member_name, queue_name } = req.body;
       const member= await Member.findOne({
            where: {name: member_name}
    });
       if(!member){
           return res.status(400).json({error: "Member do not exists!"});
       }
       queue = await Queue.findOne({
            where: { name: queue_name }
        });
        if(!queue){
            return res.status(400).json({error: "Member do not exists!"});
        }
        
        member.removeQueue(queue)
        return res.json(queue);

    }
}