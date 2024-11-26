from flask import Blueprint, jsonify
from controllers.product_controller import get_all_products, get_product_by_id

# Crée un blueprint pour les produits
product_bp = Blueprint('product', __name__)

# Route pour obtenir tous les produits
@product_bp.route('/', methods=['GET'])
def products():
    return get_all_products()

# Route pour obtenir un produit par ID
@product_bp.route('/<int:product_id>', methods=['GET'])
def product(product_id):
    return get_product_by_id(product_id)
