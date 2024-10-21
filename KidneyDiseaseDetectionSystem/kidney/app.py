import streamlit as st
import requests
from PIL import Image
import io

st.title("Kidney Disease Classification")
st.write("Upload an image to classify the type of disease.")

# Endpoint URL for Flask API
prediction_endpoint = "http://localhost:5000/upload"

def get_prediction(image):
    files = {'file': image}
    try:
        response = requests.post(prediction_endpoint, files=files)
        if response.status_code == 200:
            return response.json().get('prediction', 'Error')
        else:
            return 'Error: Unexpected response from server'
    except Exception as e:
        return f'Error: {e}'

# File uploader
uploaded_file = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png"])

if uploaded_file is not None:
    image = Image.open(uploaded_file)
    st.image(image, caption='Uploaded Image.', use_column_width=True)
    st.write("")
    st.write("Classifying...")

    # Send image to Flask server
    image_bytes = io.BytesIO()
    image.save(image_bytes, format=image.format)
    image_bytes.seek(0)
    
    prediction = get_prediction(image_bytes)
    st.write(f"The model predicts: {prediction}")
else:
    st.write("Please upload an image to classify.")
