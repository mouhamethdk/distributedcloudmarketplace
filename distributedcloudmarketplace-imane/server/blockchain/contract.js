import Web3 from 'web3';
import SimpleStorage from './SimpleStorage.json' assert { type: 'json' };

const contractAddress = '0x9bd70b421342327Eb1911F47858227865E8fda69'; // Adresse de votre contrat
const web3 = new Web3('http://127.0.0.1:7545'); // URL de Ganache

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
