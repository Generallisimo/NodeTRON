const axios = require('axios');

async function checkTransaction(address, amount, hours) {
    const url = `https://api.shasta.trongrid.io/v1/accounts/${address}/transactions/trc20`;

    try {
        // Получаем все транзакции
        const response = await axios.get(url);

        // Проверяем, что данные получены корректно
        if (!response.data || !response.data.data) {
            throw new Error('Invalid response data');
        }
        // console.log(response.data.data)
        const transactions = response.data.data;

        // Получаем текущее время
        const currentTime = Date.now();

        // Фильтрация транзакций
        const filteredTransactions = transactions.filter(tx => {
            const txTime = tx.block_timestamp;
            const txAmount = parseInt(tx.value, 10);

            // Проверка времени и суммы транзакции
            const isWithinTimeRange = (currentTime - txTime) <= (hours * 3600000); // 3600000 ms = 1 hour
            const isAmountMatch = txAmount === amount;

            return isWithinTimeRange && isAmountMatch;
        });

        return filteredTransactions;
    } catch (error) {
        console.error('Error fetching transactions:', error.message);
        throw error;
    }
}

module.exports = { checkTransaction };
