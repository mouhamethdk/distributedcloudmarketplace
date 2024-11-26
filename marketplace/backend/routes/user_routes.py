from flask import Blueprint, jsonify
from controllers.user_controller import get_all_users, get_user_by_id

# Crée un blueprint pour les utilisateurs
user_bp = Blueprint('user', __name__)

# Route pour obtenir tous les utilisateurs
@user_bp.route('/', methods=['GET'])
def users():
    return get_all_users()

# Route pour obtenir un utilisateur par ID
@user_bp.route('/<int:user_id>', methods=['GET'])
def user(user_id):
    return get_user_by_id(user_id)
