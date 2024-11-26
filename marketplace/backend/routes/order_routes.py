from flask import Blueprint, jsonify
from controllers.order_controller import create_order, get_all_orders

# Crée un blueprint pour les commandes
order_bp = Blueprint('order', __name__)

# Route pour créer une commande
@order_bp.route('/', methods=['POST'])
def create():
    return create_order()

# Route pour obtenir toutes les commandes
@order_bp.route('/', methods=['GET'])
def orders():
    return get_all_orders()
