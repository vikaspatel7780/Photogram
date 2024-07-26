import React, { useEffect, useState } from "react";
import Card from "./Card";

const Home = () => {
  const [allImages, setAllImages] = useState([]);

  useEffect(() => {
    getImages();
  }, []); // Empty dependency array ensures it runs once on mount

  const getImages = async () => {
    try {
      let response = await fetch('http://localhost:5000/api/v1/images/getImage', {
        method: 'POST', // Use POST method
        headers: {
          'Content-Type': 'application/json', // Set the content type if sending JSON
        },
        // If you need to send any data with the POST request, include it here
        // body: JSON.stringify({ key: 'value' })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let result = await response.json();
      if (result.success) {
        setAllImages(result.data); // Extract data from the response
      } else {
        console.error(result.message); // Handle non-successful responses
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <div className="container h-auto w-screen flex justify-center text-center px-4">
      <div>
        <h1 className="text-4xl font-bold text-center mt-20 mb-20">MY GALLERY</h1>
        <div className="flex flex-wrap justify-center gap-6 ">
          {allImages.length > 0 ? (
            allImages.map((image, index) => (
              <Card key={index} url={image.imageUrl} name={image.imageName} />
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
