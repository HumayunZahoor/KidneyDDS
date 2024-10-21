import React, { useState } from 'react';
import axios from 'axios';

function Feedback() {
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8081/submitFeedback', { feedback })
      .then((res) => {
        if (res.data.Status === 'Success') {
          setMessage('Feedback submitted successfully!');
        } else {
          setMessage('Error submitting feedback');
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage('Error submitting feedback');
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-3xl text-gray-900 font-bold mb-6 text-center">
          Submit Feedback
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="feedback" className="block text-gray-900 font-bold">
              Feedback
            </label>
            <textarea
              placeholder="Enter your feedback"
              name="feedback"
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:border-gray-500"
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-200 text-gray-900 p-3 rounded hover:bg-gray-400 focus:outline-none"
          >
            Submit
          </button>

          {message && (
            <p className="mt-4 text-sm text-center text-gray-600">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Feedback;