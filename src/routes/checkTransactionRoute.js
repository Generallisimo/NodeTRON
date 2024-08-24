const { checkTransaction } = require('../services/checkTransaction');

async function checkTransactionRoute(fastify) {
    fastify.get('/check_transaction', async (request, reply) => {
        try {
            // Извлекаем параметры из строки запроса
            const { address, amount, hours } = request.query;

            // Проверка, что передано значение часов и сумма
            const parsedAmount = parseInt(amount, 10);  // Преобразуем сумму в число
            const parsedHours = parseInt(hours, 10);  // Преобразуем часы в число

            if (isNaN(parsedHours) || parsedHours <= 0) {
                return reply.status(400).send({ error: 'Invalid hours parameter' });
            }

            if (isNaN(parsedAmount) || parsedAmount <= 0) {
                return reply.status(400).send({ error: 'Invalid amount parameter' });
            }

            const result = await checkTransaction(address, parsedAmount, parsedHours);
            reply.send({
                result: result
            });
        } catch (e) {
            reply.status(500).send({
                error: e.message
            });
        }
    });
}

module.exports = checkTransactionRoute;
