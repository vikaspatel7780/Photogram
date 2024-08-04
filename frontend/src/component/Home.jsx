import React, { useEffect, useState } from "react";
import USER_API_END_POINT from "../utils/Constant"
import Card from "./Card";
import Header from "./Header";

const Home = () => {
  const [allImages, setAllImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getImages();
  }, []); // Empty dependency array ensures it runs once on mount

  const getImages = async () => {
    try {
      const response = await fetch(`${USER_API_END_POINT}/getImage`, {
        method: 'POST', // Use POST method
        headers: {
          'Content-Type': 'application/json', // Set the content type if sending JSON
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.success) {
        setAllImages(result.data); // Extract data from the response
      } else {
        console.error(result.message); // Handle non-successful responses
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false); // Set loading to false after the request is complete
    }
  };

  return (
    <div className="container mx-auto min-h-screen mt-16">
    <Header/>
      <div className="flex flex-wrap justify-center gap-8">
        {isLoading ? (
          <p className="text-lg text-gray-700">Loading images...</p>
        ) : allImages.length > 0 ? (
          allImages.map((image, index) => (
            
            <Card
              key={index}
              imageUrl  ={image.imageUrl}
              imageName={image.imageName}
              userId = {image.userId}
              createdAt = {image.createdAt}
              className="shadow-lg rounded-lg overflow-hidden transform transition-transform"
            />
          ))
        ) : (
          <p className="text-lg text-gray-700">No images available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
