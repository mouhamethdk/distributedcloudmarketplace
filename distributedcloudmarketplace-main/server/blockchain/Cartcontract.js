// filepath: /Users/emmanuellaodounlami/Documents/distributedcloudmarketplace-main/server/blockchain/Cartcontract.js
import Web3 from 'web3';
import HDWalletProvider from '@truffle/hdwallet-provider';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

const infuraKey = process.env.INFURA_KEY; // Utilisez la clé Infura depuis le fichier .env
const mnemonic = process.env.MNEMONIC; // Utilisez la mnémonique depuis le fichier .env

const provider = new HDWalletProvider(mnemonic, `https://sepolia.infura.io/v3/${infuraKey}`);
const web3 = new Web3(provider);

const contractAddress = '0x4daa6aFBCe23a93178ba60C6ca538f152cb60aa7'; // Nouvelle adresse du contrat
const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "user", "type": "address" },
      { "indexed": false, "internalType": "string", "name": "username", "type": "string" },
      {
        "components": [
          { "internalType": "string", "name": "itemId", "type": "string" },
          { "internalType": "string", "name": "itemType", "type": "string" },
          { "internalType": "string", "name": "username", "type": "string" },
          { "internalType": "string", "name": "filename", "type": "string" },
          { "internalType": "string", "name": "content", "type": "string" },
          { "internalType": "string", "name": "os", "type": "string" },
          { "internalType": "string", "name": "cpu", "type": "string" },
          { "internalType": "string", "name": "gpu", "type": "string" },
          { "internalType": "string", "name": "ram", "type": "string" },
          { "internalType": "string", "name": "storageCapacity", "type": "string" }
        ],
        "indexed": false,
        "internalType": "struct CartContract.CartItem[]",
        "name": "cart",
        "type": "tuple[]"
      }
    ],
    "name": "CartUpdated",
    "type": "event"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_username", "type": "string" },
      { "internalType": "string", "name": "_itemId", "type": "string" },
      { "internalType": "string", "name": "_itemType", "type": "string" },
      { "internalType": "string", "name": "_filename", "type": "string" },
      { "internalType": "string", "name": "_content", "type": "string" },
      { "internalType": "string", "name": "_os", "type": "string" },
      { "internalType": "string", "name": "_cpu", "type": "string" },
      { "internalType": "string", "name": "_gpu", "type": "string" },
      { "internalType": "string", "name": "_ram", "type": "string" },
      { "internalType": "string", "name": "_storageCapacity", "type": "string" }
    ],
    "name": "addItemToCart",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }],
    "name": "getCart",
    "outputs": [
      {
        "components": [
          { "internalType": "string", "name": "username", "type": "string" },
          {
            "components": [
              { "internalType": "string", "name": "itemId", "type": "string" },
              { "internalType": "string", "name": "itemType", "type": "string" },
              { "internalType": "string", "name": "username", "type": "string" },
              { "internalType": "string", "name": "filename", "type": "string" },
              { "internalType": "string", "name": "content", "type": "string" },
              { "internalType": "string", "name": "os", "type": "string" },
              { "internalType": "string", "name": "cpu", "type": "string" },
              { "internalType": "string", "name": "gpu", "type": "string" },
              { "internalType": "string", "name": "ram", "type": "string" },
              { "internalType": "string", "name": "storageCapacity", "type": "string" }
            ],
            "internalType": "struct CartContract.CartItem[]",
            "name": "cart",
            "type": "tuple[]"
          }
        ],
        "internalType": "struct CartContract.UserCart",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "userCarts",
    "outputs": [{ "internalType": "string", "name": "username", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  }
];

const contract = new web3.eth.Contract(contractABI, contractAddress);

export async function executeContract(username, cart) {
  try {
    // Validation du tableau cart
    if (!Array.isArray(cart)) {
      console.error('Cart is not a valid array:', cart);
      throw new TypeError('cart must be an array');
    }

    const accounts = await web3.eth.getAccounts();

    for (const item of cart) {
      const formattedItem = {
        itemId: item.itemId.toString(),
        itemType: item.itemType,
        filename: item.filename || '',
        content: item.content || '', // Assurer que content est une chaîne base64 ou vide
        os: item.os || '',
        cpu: item.cpu || '',
        gpu: item.gpu || '',
        ram: item.ram || '',
        storageCapacity: item.storageCapacity || '', // Renommer pour correspondre au contrat
      };

      const result = await contract.methods
        .addItemToCart(
          username,
          formattedItem.itemId,
          formattedItem.itemType,
          formattedItem.filename,
          formattedItem.content,
          formattedItem.os,
          formattedItem.cpu,
          formattedItem.gpu,
          formattedItem.ram,
          formattedItem.storageCapacity
        )
        .send({
          from: accounts[0],
          gas: 500000, // Ajustez si nécessaire
        });

      console.log('Transaction successful:', result);
    }
  } catch (error) {
    console.error('Error executing contract:', error);
    throw error;
  }
}