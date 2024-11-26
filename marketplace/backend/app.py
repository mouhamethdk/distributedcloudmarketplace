from flask import Flask, send_from_directory, jsonify, request
from controllers.auth_controller import AuthController
import os

# Initialisation de l'application Flask
app = Flask(__name__, static_folder='../frontend', template_folder='../frontend/src/pages')

# Serveur des fichiers statiques
@app.route('/')
def serve_index():
    try:
        return send_from_directory(app.static_folder, 'index.html')
    except FileNotFoundError:
        return jsonify({'error': 'Fichier index.html non trouvé.'}), 404

@app.route('/<path:path>')
def serve_static_files(path):
    try:
        return send_from_directory(app.static_folder, path)
    except FileNotFoundError:
        return jsonify({'error': 'Fichier non trouvé.'}), 404

# Routes d'authentification
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()  # Récupère les données JSON
    if not data:
        return jsonify({'error': 'Données manquantes.'}), 400
    try:
        response, status = AuthController.signup(data)
        return jsonify(response), status
    except Exception as e:
        return jsonify({'error': f"Erreur lors de l'inscription : {str(e)}"}), 500

@app.route('/signin', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        # Servir la page de connexion
        try:
            return send_from_directory(app.template_folder, 'login.html')
        except FileNotFoundError:
            return jsonify({'error': 'Page de connexion non trouvée.'}), 404
    elif request.method == 'POST':
        # Gérer l'authentification avec AuthController
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Données manquantes.'}), 400
        try:
            response, status = AuthController.login(data)
            return jsonify(response), status
        except Exception as e:
            return jsonify({'error': f"Erreur lors de la connexion : {str(e)}"}), 500

# Gestion des erreurs 404
@app.errorhandler(404)
def not_found(e):
    return jsonify({'error': 'Page non trouvée.'}), 404

# Lancement de l'application Flask
if __name__ == '__main__':
    # Vérifie si les dossiers existent
    if not os.path.exists(app.static_folder):
        print(f"Erreur : Le dossier statique '{app.static_folder}' est introuvable.")
    if not os.path.exists(app.template_folder):
        print(f"Erreur : Le dossier des templates '{app.template_folder}' est introuvable.")

    app.run(debug=True, host='127.0.0.1', port=5000)
