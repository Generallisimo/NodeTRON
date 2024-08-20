const Fastify = require('fastify');
const sendRouteTRX = require('./src/routes/sendRouteTrx');
const sendRouteUSDT = require('./src/routes/sendRouteUsdt');

const fastify = Fastify({ logger: true });

fastify.register(sendRouteTRX);
fastify.register(sendRouteUSDT);

// const TronWeb = require('tronweb');
// const axios = require('axios');
// const tronWeb = new TronWeb({
//     fullHost: 'https://api.nileex.io',
// });

// const USDT_CONTRACT_ADDRESS = 'TXYZopYRdj2D9XRtbG411XZZ3kM5VkAeBf'; // Убедитесь, что адрес верный

// async function verifyUSDTTransaction(addressTo, addressFrom, amount) {
//     try {
//         // Формируем запрос к TronScan API
//         const response = await axios.get('https://nile.tronscan.org/api/transaction', {
//             params: {
//                 sort: '-timestamp',
//                 count: true,
//                 limit: 50,
//                 address: addressTo,
//                 token: USDT_CONTRACT_ADDRESS
//             }
//         });

//         console.log("TronScan API response:", response.data);

//         const transactions = response.data.data;

//         // Ищем транзакцию с нужными параметрами
//         const matchingTransaction = transactions.find(tx => {
//             const txAmount = tronWeb.fromSun(tx.tokenTransferInfo.amount_str);
//             const senderAddress = tx.tokenTransferInfo.from_address;

//             console.log(`Checking transaction: from ${senderAddress}, to ${addressTo}, amount ${txAmount}`);
//             return senderAddress === addressFrom && parseFloat(txAmount) === parseFloat(amount);
//         });

//         return matchingTransaction ? true : false;

//     } catch (error) {
//         console.error('Error verifying transaction:', error);
//         throw error;
//     }
// }

// async function handleIncomingPayment(request, reply) {
//     const { addressTo, addressFrom, amount } = request.query;

//     try {
//         const isVerified = await verifyUSDTTransaction(addressTo, addressFrom, amount);

//         if (isVerified) {
//             reply.send({ status: 'success', message: 'Payment verified and processed.' });
//         } else {
//             reply.status(400).send({ status: 'error', message: 'Transaction not found or invalid.' });
//         }
//     } catch (error) {
//         reply.status(500).send({ status: 'error', message: error.message });
//     }
// }

// // Регистрация маршрута для GET-запроса
// fastify.get('/checkPayments', handleIncomingPayment);

fastify.listen({ port: 3000 }, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    fastify.log.info(`Server listening at ${address}`);
});
