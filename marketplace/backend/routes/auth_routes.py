from flask import Blueprint, request, jsonify
from controllers.auth_controller import signup, login

# Création d'un Blueprint pour les routes d'authentification
auth_bp = Blueprint('auth', __name__)

# Route pour s'inscrire
@auth_bp.route('/signup', methods=['POST'])
def signup_route():
    return signup()  # Appel à la fonction d'inscription du contrôleur

# Route pour se connecter
@auth_bp.route('/login', methods=['POST'])
def login_route():
    return login()  # Appel à la fonction de connexion du contrôleur
