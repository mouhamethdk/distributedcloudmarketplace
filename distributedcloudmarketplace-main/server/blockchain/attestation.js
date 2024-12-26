import Web3 from 'web3';
import HDWalletProvider from '@truffle/hdwallet-provider';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });



const infuraKey = process.env.INFURA_KEY; // Utilisez la clé Infura depuis le fichier .env
const mnemonic = process.env.MNEMONIC; // Utilisez la mnémonique depuis le fichier .env

const provider = new HDWalletProvider(mnemonic, `https://sepolia.infura.io/v3/${infuraKey}`);
const web3 = new Web3(provider);


const contractAddress = '0x445f9B16973710eAA93a439307AfeafbbBb6ce36';
const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      { "indexed": false, "internalType": "string", "name": "contentHash", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "contentType", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "username", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "fileName", "type": "string" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
    ],
    "name": "ContentAdded",
    "type": "event"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "contentHash", "type": "string" },
      { "internalType": "string", "name": "contentType", "type": "string" },
      { "internalType": "string", "name": "username", "type": "string" },
      { "internalType": "string", "name": "fileName", "type": "string" }
    ],
    "name": "addContent",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "", "type": "string" }
    ],
    "name": "contents",
    "outputs": [
      { "internalType": "string", "name": "contentHash", "type": "string" },
      { "internalType": "string", "name": "contentType", "type": "string" },
      { "internalType": "string", "name": "username", "type": "string" },
      { "internalType": "string", "name": "fileName", "type": "string" },
      { "internalType": "uint256", "name": "timestamp", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "contentHash", "type": "string" },
      { "internalType": "string", "name": "contentType", "type": "string" },
      { "internalType": "string", "name": "username", "type": "string" },
      { "internalType": "string", "name": "fileName", "type": "string" }
    ],
    "name": "verifyContent",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  }
];

const contract = new web3.eth.Contract(contractABI, contractAddress);

export async function addContent(contentHash, contentType, author, filename) {
  try {
    const accounts = await web3.eth.getAccounts();
    const fromAddress = accounts[0];
    console.log('Using account:', fromAddress);

    const result = await contract.methods.addContent(contentHash, contentType, author, filename).send({
      from: fromAddress,
      gas: 300000, // Assurez-vous que cette valeur couvre vos besoins
    });
    console.log('Transaction result:', result);
    return result;
  } catch (error) {
    console.error('Error adding content:', error);
    throw error;
  }
}

export async function verifyContent(contentHash, contentType, author, filename) {
  try {
    const result = await contract.methods.verifyContent(contentHash, contentType, author, filename).call();
    console.log('Verification result:', result);
    return result;
  } catch (error) {
    console.error('Error verifying content:', error);
    console.error('Content Hash:', contentHash);
    console.error('Content Type:', contentType);
    console.error('Author:', author);
    console.error('Filename:', filename);
    throw error;
  }
}





