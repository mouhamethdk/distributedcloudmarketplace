import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs/promises';
import Web3 from 'web3';

// Définir __dirname manuellement
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contractAddress = '0x4B58d56DCFf5035f750b4B26f811209FFf1bE6A7'; // Adresse de votre contrat
const web3 = new Web3('http://127.0.0.1:7545'); // URL de Ganache

async function loadContractABI() {
  const filePath = path.resolve(__dirname, 'CartContract.json'); // Utilisez __dirname pour obtenir le chemin absolu
  const fileContents = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(fileContents);
}

const contractABI = await loadContractABI();
const contract = new web3.eth.Contract(contractABI.abi, contractAddress);

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
        ...item,
        itemId: item.itemId.toString(), // Convertir ObjectId en chaîne
        content: item.content || '', // Assurer que content est une chaîne base64 ou vide
        storageCapacity: item.storageCapacity || '', // Renommer pour correspondre au contrat
      };

      const result = await contract.methods
        .addItemToCart(
          username,
          formattedItem.itemId,
          formattedItem.itemType,
          formattedItem.filename || '',
          formattedItem.content,
          formattedItem.os || '',
          formattedItem.cpu || '',
          formattedItem.gpu || '',
          formattedItem.ram || '',
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
