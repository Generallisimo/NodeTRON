const axios = require('axios');

async function checkTXID(transactionHash) {
    const url = `https://api.shasta.trongrid.io/walletsolidity/gettransactionbyid`;

    try {
        
        const response = await axios.post(url, {value: transactionHash});

        
        if (response.data && response.data.ret && response.data.ret[0]) {
            const status = response.data.ret[0].contractRet;
            console.log(status === 'SUCCESS')
            return status === 'SUCCESS';  // Проверка успешности транзакции
        }

        return false;
        
    } catch (error) {
        console.error('Error fetching transactions:', error.message);
        throw error;
    }
}

module.exports = { checkTXID };
