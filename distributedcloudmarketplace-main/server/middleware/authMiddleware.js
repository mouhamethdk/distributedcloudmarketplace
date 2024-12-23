import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/userModel.js';

const userDb = mongoose.connection.useDb('users');
const UserModel = userDb.model('User', User.schema);

export const protect = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ error: 'Accès refusé, token manquant' });
    }
    const token = authHeader.replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token décodé:', decoded); // Ajoutez ce journal pour vérifier le contenu du token

        // Ajoutez un journal pour vérifier l'id de l'utilisateur
        console.log('Recherche de l\'utilisateur avec l\'id:', decoded.id);

        req.user = await UserModel.findById(decoded.id);

        // Ajoutez un journal pour vérifier le résultat de la recherche de l'utilisateur
        console.log('Utilisateur trouvé:', req.user);

        if (!req.user) {
            console.log('Utilisateur non trouvé pour l\'id:', decoded.id); // Ajoutez ce journal pour vérifier l'id de l'utilisateur
            return res.status(401).json({ error: 'Utilisateur non trouvé' });
        }
        next();
    } catch (err) {
        console.error('Erreur lors de la vérification du token:', err); // Ajoutez ce journal pour vérifier les erreurs de vérification du token
        res.status(401).json({ error: 'Token invalide' });
    }
};

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Accès refusé, utilisateur non authentifié' });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Accès refusé, rôle insuffisant' });
        }
        next();
    };
};