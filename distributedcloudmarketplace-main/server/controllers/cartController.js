import mongoose from 'mongoose';
import crypto from 'crypto';
import User from '../models/userModel.js';
import Application from '../models/applicationModel.js';
import Data from '../models/dataModel.js';
import Hardware from '../models/hardwareModel.js';
import Cart from '../models/cartModel.js';
import { executeContract } from '../blockchain/Cartcontract.js';
import { verifyContent } from '../blockchain/attestation.js'; // Assurez-vous que cette fonction existe et fonctionne correctement

// Utiliser les bases de données requests, datas et applications
const requestDb = mongoose.connection.useDb('requests');
const targetConnection = mongoose.connection.useDb('datas');
const targetConnection2 = mongoose.connection.useDb('applications');
const targetConnection3 = mongoose.connection.useDb('hardware');


// Ajouter un élément au panier
export const addToCart = async (req, res) => {
  const { itemId, itemType } = req.body;
  try {
    let item;
    if (itemType === 'Application') {
      item = await Application.findById(itemId);
    } else if (itemType === 'Data') {
      item = await Data.findById(itemId);
    } else if (itemType === 'Hardware') {
      item = await Hardware.findById(itemId);
    }

    if (!item) {
      return res.status(404).json({ error: `${itemType} not found` });
    }

    const user = await User.findById(req.user.id);
    let cart = await requestDb.model('request', Cart.schema).findOne({ userId: user._id });
    if (!cart) {
      cart = new (requestDb.model('request', Cart.schema))({ userId: user._id, items: [] });
    }

    cart.items.push({ itemId, itemType });
    await cart.save();

    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

// Récupérer le panier de l'utilisateur
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const cart = await requestDb.model('request', Cart.schema).findOne({ userId: user._id });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error getting cart:', error);
    res.status(500).json({ error: 'Failed to get cart' });
  }
};

// Fonction pour vérifier et valider le panier
export const validateCart = async (cart) => {
  if (!Array.isArray(cart.items)) {
    throw new Error('Cart items should be an array');
  }

  for (const item of cart.items) {
    const { itemId, itemType } = item;
    let content;
    if (itemType === 'application') {
      content = await targetConnection2.collection('application').findOne({ _id: new mongoose.Types.ObjectId(itemId) });
    } else if (itemType === 'datas') {
      content = await targetConnection.collection('datas').findOne({ _id: new mongoose.Types.ObjectId(itemId) });
    } else {
      throw new Error(`Invalid item type: ${itemType}`);
    }

    if (!content) {
      throw new Error(`${itemType} with ID ${itemId} not found`);
    }

    // Convertir le contenu en Buffer si nécessaire
    const contentBuffer = Buffer.isBuffer(content.content) ? content.content : Buffer.from(content.content.buffer);

    console.log(contentBuffer);

    // Recalculer le hash du contenu
    const contentHash = crypto.createHash('sha256').update(contentBuffer).digest('hex');

    console.log('Content hash:', contentHash);

    // Vérifier le contenu sur la blockchain
    const isVerified = await verifyContent(contentHash, itemType, content.username, content.filename);
    if (!isVerified) {
      throw new Error(`${itemType} ${content.filename} is not verified on the blockchain`);
    }

    // Vérification supplémentaire si nécessaire
    if (content.username !== item.username) {
      throw new Error(`Username mismatch for ${itemType} with ID ${itemId}`);
    }
  }
};

// Gérer le checkout et interagir avec le contrat intelligent
export const checkout = async (req, res) => {
  try {
    const cartItems = req.body.cart; // Supposons que les articles du panier sont envoyés dans le corps de la requête
    const userId = req.user._id;
    const username = req.user.name; // Récupérer le nom de l'utilisateur à partir de req.user
    const cartWithUsername = cartItems.map(item => ({ ...item, username }));

    console.log('Received checkout request with cart items:', cartItems);

    const dataFilenames = cartItems.map(item => item.data).filter(Boolean);
    const applicationFilenames = cartItems.map(item => item.application).filter(Boolean);
    const hardwareFilenames = cartItems.map(item => item.hardware).filter(Boolean);

    console.log('Looking for data files with filenames:', dataFilenames);
    console.log('Looking for application files with filenames:', applicationFilenames);

    // Récupérer les fichiers de données depuis la collection "datas"
    const dataCollection = targetConnection.collection('datas');
    const dataFiles = await dataCollection.find({ filename: { $in: dataFilenames } }).toArray();
    console.log('Fetched data files from DB:', dataFiles);

    // Récupérer les fichiers d'application depuis la collection "application"
    const applicationCollection = targetConnection2.collection('application');
    const applicationFiles = await applicationCollection.find({ filename: { $in: applicationFilenames } }).toArray();
    console.log('Fetched application files from DB:', applicationFiles);


    // Récupérer les fichiers de matériel depuis la collection "hardware"
    const hardwareCollection = targetConnection3.collection('hardwareDetails');
    const hardwareFiles = await hardwareCollection.find({ machinename: { $in: hardwareFilenames } }).toArray();
    console.log('Fetched hardware files from DB:', hardwareFiles);

    const allFiles = [...dataFiles, ...applicationFiles];
    const allFilewithHardware = [...dataFiles, ...applicationFiles, ...hardwareFiles];

    if (allFiles.length === 0) {
      return res.status(404).json({ message: 'No files found for the given filenames' });
    }

    // Transformer les éléments du panier pour utiliser des ObjectIds valides
    const transformedCart = allFiles.map(file => ({
      itemId: file._id,
      itemType: file.type,
      username: file.username,
      filename: file.filename,
      content: file.content
    }));

    const transformedCartWitHardware = allFilewithHardware.map(file => {
      if (file.type === 'hardware') {
        return {
          itemId: file._id,
          itemType: file.type,
          username: file.username,
          os: file.os,
          cpu: file.cpu,
          gpu: file.gpu,
          ram: file.ram,
          storage: file.storage
        };
      } else {
        return {
          itemId: file._id,
          itemType: file.type,
          username: file.username,
          filename: file.filename,
          content: file.content ? file.content.toString('base64') : '' // Convertir en base64
        };
      }
    });

    console.log('Transformed cart items:', transformedCart);

    // Vérifier et valider le panier
    await validateCart({ items: transformedCart });

    // Enregistrer le panier dans la collection request

    console.log('Data filenames:', dataFilenames);
    console.log('Application filenames:', applicationFilenames);
    console.log('Hardware in cart items:', hardwareFilenames);

    const cartString = JSON.stringify(cartItems);
    console.log('Saving cart to MongoDB here:', cartString);
    const newCart = new (requestDb.model('request', Cart.schema))({
      userId,
      username,
      cart: transformedCartWitHardware,
      createdAt: new Date(),
    });

    console.log('Saving new cart to MongoDB:', newCart);

    await newCart.save();

    console.log('Cart saved successfully');

    // Interagir avec le contrat intelligent
    const result = await executeContract(username, transformedCartWitHardware);
    console.log('Contract execution result:', result);
    res.json(result);
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ message: 'Checkout failed', error: error.message });
  }
};


