from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from PIL import Image
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/upload": {"origins": "http://localhost:3000"}}, supports_credentials=True)

model_path = r'D:\\KidneyDiseaseDetectionSystem\\kidney\\my_model.h5'
model = load_model(model_path)

def preprocess_image(image, target_size):
    image = image.convert("L")  # Convert image to grayscale
    image = image.resize(target_size)
    image = img_to_array(image)
    image = np.expand_dims(image, axis=-1)  # Add a channel dimension
    image = np.expand_dims(image, axis=0)  # Add a batch dimension
    return image

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    try:
        image = Image.open(file)
        processed_image = preprocess_image(image, target_size=(200, 200))

        prediction = model.predict(processed_image)
        result = np.argmax(prediction, axis=1)[0]

        class_labels = ['Cyst', 'Normal', 'Stone', 'Tumor']
        prediction_text = class_labels[result]

        return jsonify({'prediction': prediction_text}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)
