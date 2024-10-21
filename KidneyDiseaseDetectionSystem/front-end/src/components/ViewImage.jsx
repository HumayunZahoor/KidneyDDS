import React, { useEffect, useState } from 'react';

const ViewImage = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/getImage', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const imageData = await response.json();
          setImage(imageData);
        } else {
          console.error('Error fetching image:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching image:', error.message);
      }
    };

    fetchImage();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white">
      <div className="max-w-2xl p-6 bg-white rounded shadow-md">
        {image ? (
          <img
            src={`data:image/jpeg;base64,${image}`}
            alt="X-ray"
            className="w-full h-auto rounded-xl"
            // style={{ width: '800px', height: '400px', borderRadius: '20px' }}
          />
        ) : (
          <p className="text-center text-yellow-900 bg-yellow-200">No image available</p>
        )}
      </div>
    </div>
  );
};

export default ViewImage;
