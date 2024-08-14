const {sendTrx} = require('../services/send');

async function sendRoute(fastify, option){
    fastify.post('/sendTron', async(request, reply)=>{
        try{
            const {addressTo, amount, ownerAddress, privateKey} = request.query;
            const result = await sendTrx(addressTo, amount, ownerAddress, privateKey);
            reply.send(result);
        }catch(error){
            reply.status(500).send({error: error.message});
        };
    })
}

module.exports = sendRoute;