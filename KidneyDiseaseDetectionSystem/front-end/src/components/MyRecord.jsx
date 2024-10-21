import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyRecord = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8081/getMyRecord', { withCredentials: true })
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user record:', error);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl text-gray-900 font-bold text-center mb-4">My Record</h2>
        <div className="grid grid-cols-2 gap-4 text-gray-900">
          <p className="font-semibold">ID:</p>
          <p>{userData.id}</p>
          <p className="font-semibold">Name:</p>
          <p>{userData.name}</p>
          <p className="font-semibold">Email:</p>
          <p>{userData.email}</p>
          <p className="font-semibold">Result:</p>
          <p>{userData.result}</p>
          <p className="font-semibold">Prescription:</p>
          <p>{userData.prescription}</p>
        </div>
      </div>
    </div>
  );
};

export default MyRecord;
