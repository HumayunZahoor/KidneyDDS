import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserFeedback() {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = () => {
    axios.get('http://localhost:8081/getAllUserFeedback')
      .then((res) => {
        setFeedbackList(res.data);
      })
      .catch((err) => {
        console.error('Error fetching feedback:', err);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:max-w-4xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-black"> {/* Changed text color to black */}
          User Feedback
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-200"> {/* Changed background color to gray */}
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"> {/* Changed text color to black */}
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"> {/* Changed text color to black */}
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"> {/* Changed text color to black */}
                  Feedback
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {feedbackList.map((feedback, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black"> {/* Changed text color to black */}
                    {feedback.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-black"> {/* Changed text color to black */}
                    {feedback.email}
                  </td>
                  <td className="px-6 py-4 whitespace-wrap text-sm text-black"> {/* Changed text color to black */}
                    {feedback.feedback}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserFeedback;
