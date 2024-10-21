import React, { useState } from 'react';
import axios from 'axios';

function UploadXray() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        setPrediction(response.data.prediction); // Update prediction state
        window.alert('Picture uploaded successfully!');
        
        // Send prediction to the server to update the database
        await axios.post('http://localhost:8081/savePrediction', { prediction: response.data.prediction });

      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request:', error.request);
      } else {
        console.error('Error:', error.message);
      }
      console.error('Config:', error.config);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center justify-center">
      <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-3xl font-bold mb-6 text-black">Upload Ultrasound Image</h2> {/* Changed text color to black */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="file" 
            onChange={handleFileChange} 
            className="mb-4 border rounded p-2 w-full"
          />
          <button 
            type="submit" 
            className="btn bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md w-full" 
          >
            Upload
          </button>
        </form>
        {prediction && (
          <h2 className="text-xl text-black mt-4">Prediction: {prediction}</h2> 
        )}
      </div>
    </div>
  );
}

export default UploadXray;
