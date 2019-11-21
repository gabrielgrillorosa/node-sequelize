const Queue = require('../models/Queue');
const Member = require('../models/Member');
const Caller = require('../models/Caller');
const Statistics = require('../models/Statistics')
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
        const { sid, name,  weight, max } = req.body.queues;
        const { completed,  abandoned, holdtimet, SL,  SLPerf } = req.body.queues;
        const [ queue, created] = await Queue.findOne({
            where: {name},
            defaults: { sid, name,  weight, max }
        })

        if(queue){
            let date = new Date();
            let current_day = date.getDay()
            let statistics = Statistics.findOrCreate({
                where: {created_at },
                 defaults:  { completed,  abandoned, holdtimet, SL,  SLPerf }
            })
           
       }
       const statistics  = await Queue.findOne({
           include: { association: 'members', attributes: ['name', 'callsTaken'], through: { attributes : [] } },
           where: { name: queue_name }           
        });
        if(!queue){
           return res.status(400).json({error: "Queue do not exists!"});
       }
        
       await member.addQueue(queue);
       return res.json({queue});
   },

    async listQueues(req, res){
     
        const queues = await Queue.findAll();       
        return res.json(queues);
    },
    
    async addCaller (req, res){
        console.log('socorro')
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
         
        await member.addQueue(queue);
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