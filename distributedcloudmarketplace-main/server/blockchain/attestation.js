import Web3 from 'web3';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Définir __dirname manuellement
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contractAddress = '0xdFEc58c5A667b02e48B1905Fb588b64b5F40F97E'; // Adresse de votre contrat déployé
const web3 = new Web3('http://127.0.0.1:7545'); // URL de Ganache

async function loadContractABI() {
  const filePath = path.resolve(__dirname, 'Attestation.json'); // Utilisez __dirname pour obtenir le chemin absolu
  const fileContents = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(fileContents);
}

const contractABI = await loadContractABI();
const contract = new web3.eth.Contract(contractABI.abi, contractAddress);

export async function addContent(contentHash, contentType, author, filename) {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log('Accounts:', accounts);
    const result = await contract.methods.addContent(contentHash, contentType, author, filename).send({
      from: accounts[0],
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
    throw error;
  }
}