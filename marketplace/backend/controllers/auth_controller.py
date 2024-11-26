# from flask import jsonify, request
# from pymongo.mongo_client import MongoClient
# from pymongo.server_api import ServerApi
# from werkzeug.security import generate_password_hash, check_password_hash
#
# # Configuration MongoDB
# uri = "mongodb+srv://yassinekouassi1949:Jo0tuJFuWPedSHzJ@cluster0.td2bf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
# client = MongoClient(uri, server_api=ServerApi('1'))
# db = client['my_database']  # Remplacez par le nom de votre base
# users_collection = db['users']  # Collection "users" pour stocker les comptes
#
# class AuthController:
#     @staticmethod
#     def signup(data):
#         name = data.get('name')
#         email = data.get('email')
#         password = data.get('password')
#         role = data.get('role')  # Rôle: Fournisseur ou Utilisateur
#
#         # Vérifier si l'utilisateur existe déjà
#         if users_collection.find_one({"email": email}):
#             return {"message": "Cet email est déjà utilisé."}, 400
#
#         # Hacher le mot de passe et créer l'utilisateur
#         hashed_password = generate_password_hash(password, method='sha256')
#         user_data = {
#             "name": name,
#             "email": email,
#             "password": hashed_password,
#             "role": role
#         }
#
#         users_collection.insert_one(user_data)
#         return {"message": "Compte créé avec succès.", "email": email, "role": role}, 201
#
#     @staticmethod
#     def login(data):
#         email = data.get('email')
#         password = data.get('password')
#
#         # Rechercher l'utilisateur dans la base de données
#         user = users_collection.find_one({"email": email})
#         if not user:
#             return {"message": "Utilisateur introuvable."}, 404
#
#         # Vérifier le mot de passe
#         if check_password_hash(user['password'], password):
#             return {"message": "Connexion réussie.", "email": email, "role": user['role']}, 200
#         else:
#             return {"message": "Mot de passe incorrect."}, 401

from flask import jsonify
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from werkzeug.security import generate_password_hash, check_password_hash
import os
import re
import logging

# Configuration des logs
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configuration MongoDB via variable d'environnement
uri = os.getenv("MONGO_URI", "mongodb+srv://user:password@cluster0.mongodb.net/my_database?retryWrites=true&w=majority")

try:
    client = MongoClient(uri, server_api=ServerApi('1'))
    db = client['my_database']  # Nom de votre base
    users_collection = db['users']  # Collection "users"
    logger.info("Connexion à MongoDB réussie.")
except Exception as e:
    logger.error(f"Erreur de connexion à MongoDB : {e}")
    raise e

class AuthController:
    @staticmethod
    def validate_email(email):
        """Valide le format de l'email."""
        email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
        return re.match(email_regex, email)

    @staticmethod
    def validate_password(password):
        """Vérifie si le mot de passe respecte les règles (longueur minimale)."""
        return len(password) >= 8

    @staticmethod
    def signup(data):
        try:
            # Validation des données reçues
            name = data.get('name')
            email = data.get('email')
            password = data.get('password')
            role = data.get('role')  # Rôle: Fournisseur ou Utilisateur

            if not name or not email or not password or not role:
                return {"message": "Tous les champs sont obligatoires."}, 400

            if not AuthController.validate_email(email):
                return {"message": "Format d'email invalide."}, 400

            if not AuthController.validate_password(password):
                return {"message": "Le mot de passe doit contenir au moins 8 caractères."}, 400

            # Vérifier si l'utilisateur existe déjà
            if users_collection.find_one({"email": email}):
                return {"message": "Cet email est déjà utilisé."}, 400

            # Hacher le mot de passe et créer l'utilisateur
            hashed_password = generate_password_hash(password, method='sha256')
            user_data = {
                "name": name,
                "email": email,
                "password": hashed_password,
                "role": role
            }

            users_collection.insert_one(user_data)
            logger.info(f"Nouvel utilisateur créé : {email}")
            return {"message": "Compte créé avec succès.", "email": email, "role": role}, 201

        except Exception as e:
            logger.error(f"Erreur lors de l'inscription : {e}")
            return {"message": "Une erreur est survenue lors de la création du compte."}, 500

    @staticmethod
    def login(data):
        try:
            # Validation des données reçues
            email = data.get('email')
            password = data.get('password')

            if not email or not password:
                return {"message": "Email et mot de passe sont obligatoires."}, 400

            if not AuthController.validate_email(email):
                return {"message": "Format d'email invalide."}, 400

            # Rechercher l'utilisateur dans la base de données
            user = users_collection.find_one({"email": email})
            if not user:
                return {"message": "Utilisateur introuvable."}, 404

            # Vérifier le mot de passe
            if check_password_hash(user['password'], password):
                logger.info(f"Utilisateur connecté : {email}")
                return {
                    "message": "Connexion réussie.",
                    "email": email,
                    "role": user['role']
                }, 200
            else:
                logger.warning(f"Tentative de connexion échouée pour : {email}")
                return {"message": "Mot de passe incorrect."}, 401

        except Exception as e:
            logger.error(f"Erreur lors de la connexion : {e}")
            return {"message": "Une erreur est survenue lors de la connexion."}, 500
