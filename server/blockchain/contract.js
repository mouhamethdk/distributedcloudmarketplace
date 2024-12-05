import Web3 from 'web3';
import SimpleStorage from './SimpleStorage.json' assert { type: 'json' };

const contractAddress = '0x7b9760F36c7E38e186169C114E916a73bD79e28c'; // Adresse de votre contrat
const web3 = new Web3('HTTP://127.0.0.1:7545'); // URL de Ganache

const contractABI = SimpleStorage.abi;
const contract = new web3.eth.Contract(contractABI, contractAddress);

export async function executeContract(cart) {
  try {
    const accounts = await web3.eth.getAccounts();
    for (const item of cart) {
      const result = await contract.methods
        .addItem(item.data, item.application)
        .send({
          from: accounts[0],
          gas: 300000, // Assurez-vous que cette valeur couvre vos besoins
        });
      console.log('Transaction successful:', result);
    }
  } catch (error) {
    console.error('Blockchain interaction error:', error);
    throw error;
  }
}
