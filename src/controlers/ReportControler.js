const Member = require('../models/Member');
const { Op } = require ('sequelize')
module.exports = {
    async show (req, res){
        //trazer todos os membros da fila 701 com mais de 2 chamadas
        memebs = await Member.findAll({
            attributes: ['name', 'callsTaken'],
            where: { 
                callsTaken: {
                    [ Op.gt ]: 4
                }
             },
             include: [
                 { 
                    association: 'queues', 
                    required: false,
                    where:  { 
                        name: {
                        [ Op.iLike ]: '%703%' 
                        }
                    },
                    attributes: ['name', 'sid'],
                    through: { attributes:[] }              
                 }                
             ]
        });
        return res.json(memebs);

    }
    
}
 