// const tronWeb = require('../config/tronConfig')
const TronWeb = require('tronweb');

async function sendTrx(addressTo, Amount, ownerAddress, privateKey){
    try{
        const tronWeb = new TronWeb({
            fullHost: 'https://api.nileex.io',
            privateKey: privateKey
        });
        const transaction = await tronWeb.transactionBuilder.sendTrx(addressTo, tronWeb.toSun(Amount), ownerAddress);
        const signed = await tronWeb.trx.sign(transaction);
        const broadcast = await tronWeb.trx.sendRawTransaction(signed);
        return broadcast;
    }catch(error){
        console.error(`Error during transaction: ${error}`);
        throw new Error(`Transaction err: ${error.message}`);
    };
}

module.exports={sendTrx};