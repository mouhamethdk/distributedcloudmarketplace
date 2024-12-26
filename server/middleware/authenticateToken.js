// middleware/authenticateToken.js
import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']; // Récupérer le token dans l'en-tête Authorization

    if (!token) {
        return res.status(401).json({ message: 'Accès refusé, token manquant' });
    }

    // Extraire le token après "Bearer"
    const tokenValue = token.split(' ')[1]; 

    jwt.verify(tokenValue, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token invalide ou expiré' });
        }

        req.user = user; // Attacher les données du token à req.user
        next();
    });
};