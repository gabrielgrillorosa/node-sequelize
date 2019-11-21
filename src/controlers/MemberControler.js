const Member = require('../models/Member');
const Queue = require('../models/Queue')
module.exports = {
    
    async list(req, res){
        
        const members = await Member.findAll({
            include: { association: 'queues', attributes: ['name', 'sid'], through: { attributes : [] } }
        });
        return res.json(members);
    },

    async insertMember (req, res){
        const { member_name, callsTaken, queue_name } = req.body;
           
        const queue = await Queue.findOne({
            where: { name: queue_name },
        });
        if(!queue){
            res.status(400).json({error: "Queue do not exist for insert Member"})
        }
        
        const member = await Member.findOrCreate({
            where: {name: member_name },
            defaults: {member_name, callsTaken}

        });
        queue.addMembers(member)
        return res.json(member)
        
     },
    
}