Voici une version synthétisée et mieux structurée du README avec une section spéciale pour le code :

---

# Application Blockchain avec Ganache

Ce projet permet de gérer du contenu en exploitant la blockchain Ethereum pour garantir son intégrité et son authenticité. Voici un guide pour démarrer et utiliser l'application.

---

## 🚀 Démarrage de l'Application

### Prérequis

- **Node.js** : [Installer Node.js](https://nodejs.org/)  
- **Ganache** : [Télécharger Ganache](https://trufflesuite.com/ganache/)  
- **Truffle** : Installer avec `npm install -g truffle`

### Étapes

1. **Cloner le dépôt**  
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Installer les dépendances**  
   ```bash
   npm install
   ```

3. **Démarrer Ganache**  
   - Créez un nouveau workspace dans Ganache.  
   - Configurez l'URL : `http://127.0.0.1:7545`.

4. **Configurer Truffle**  
   - Vérifiez la configuration dans `truffle-config.js`.  
   - Déployez les contrats intelligents :  
     ```bash
     truffle migrate --network development
     ```

5. **Démarrer le serveur**  
   ```bash
   npm start
   ```

---

## ⚙️ Fonctionnalités Principales

### 1. **Dépôt de Contenu**  
Les utilisateurs peuvent télécharger des fichiers, dont le hash est enregistré sur la blockchain et les métadonnées sont stockées dans MongoDB.

**Code : uploadContent**
```javascript
export const uploadContent = async (req, res) => {
  const file = req.file;
  const { type: fileType } = req.body;
  const fileName = file.originalname;
  const username = req.user.name;

  if (!fileName || !fileType) {
    return res.status(400).json({ error: 'File name and type are required' });
  }

  try {
    const fileContent = file.buffer;
    const contentHash = crypto.createHash('sha256').update(fileContent).digest('hex');
    const result = await addContent(contentHash, fileType, username, fileName);

    const newContent = {
      username,
      contentHash,
      name: fileName,
      fileType,
      createdAt: new Date(),
    };

    const collection = targetConnection.collection("Attestation");
    await collection.insertOne(newContent);

    res.status(201).json({ message: 'Content uploaded and attested successfully', content: newContent });
  } catch (error) {
    console.error('Error uploading content:', error);
    res.status(500).json({ error: 'Failed to upload content' });
  }
};
```

---

### 2. **Ajout au Panier**  
Les utilisateurs peuvent ajouter du contenu au panier, validé et enregistré dans MongoDB. Lors du checkout, les détails sont également enregistrés sur la blockchain.

**Code : addToCart**
```javascript
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
```

**Code : checkout**
```javascript
export const checkout = async (req, res) => {
  try {
    const cartItems = req.body.cart;
    const userId = req.user._id;
    const username = req.user.name;

    const transformedCartWithHardware = await transformCartItems(cartItems);
    await validateCart({ items: transformedCartWithHardware });

    const newCart = new (requestDb.model('request', Cart.schema))({
      userId,
      username,
      items: transformedCartWithHardware,
      createdAt: new Date(),
    });

    await newCart.save();
    await executeContract(username, transformedCartWithHardware);

    res.status(200).json({ message: 'Checkout successful' });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ message: 'Checkout failed', error: error.message });
  }
};
```

---

## 📖 Résumé

- **Dépôt de contenu** : Hachage et enregistrement sur la blockchain + MongoDB.  
- **Ajout au panier** : Contenu validé, enregistré en base et sur la blockchain.  

Suivez les étapes pour démarrer et utiliser efficacement l'application.
