# Filename - main.py

# Import flask
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins='*')

@app.route('/analyze', methods=['POST'])
def analyze():
    # Retrieve JSON data from the request
    form_data = request.json

    # Process the form data
    filepath = form_data.get('uri')

    # Print received form data
    print('Received file URL:', filepath)

    return jsonify({'message': 'File URL received', 'url': filepath})

if __name__ == "__main__":
    app.run(debug=True, port=812)
