import base64
from io import BytesIO
from flask import Flask, jsonify, request
from flask_cors import CORS
from genreclassifier import predict_genre

app = Flask(__name__)
cors = CORS(app, origins='*')

@app.route('/analyze', methods=['POST'])
def analyze():
    form_data = request.json
    audio_base64 = form_data.get('uri')
    
    if not audio_base64:
        return jsonify({"error": "No audio data received"}), 400

    audio_data = base64.b64decode(audio_base64)
    audio_stream = BytesIO(audio_data)

    output = predict_genre(audio_stream)

    return jsonify(output)

if __name__ == "__main__":
    app.run(debug=True, port=812)


