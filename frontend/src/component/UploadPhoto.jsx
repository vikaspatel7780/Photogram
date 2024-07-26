import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadPhoto = () => {
  const [imageFile, setImageFile] = useState(null); // State to store file
  const [imageName, setImageName] = useState(""); // State to store image name
  const [loading, setLoading] = useState(false); // State for loading status
  const [message, setMessage] = useState(""); // State for messages

  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!imageFile || !imageName) {
      setMessage("Both image file and image name are required.");
      return;
    }

    setLoading(true); // Set loading to true

    const formData = new FormData();
    formData.append("imageUrl", imageFile); // Append file to FormData
    formData.append("imageName", imageName); // Append image name to FormData

    try {
      const response = await fetch("http://localhost:5000/api/v1/images/uploadImage", {
        method: "POST",
        body: formData, // Send FormData with the file
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setMessage("Image uploaded successfully.");
        setImageFile(null); // Reset file input
        setImageName(""); // Reset image name
        navigate("/"); // Navigate to the home route on successful upload
      } else {
        setMessage(`Error uploading image: ${result.message}`);
      }
    } catch (error) {
      setMessage(`Error during image upload: ${error.message}`);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className="h-auto w-screen flex flex-col justify-center items-center"> {/* Full height and center content */}
   <h1 className="text-4xl font-bold text-center mt-20 mb-10">Upload Image</h1>
      <form
        className="flex flex-col items-center space-y-4 border border-gray-400 p-10 rounded-lg bg-slate-300 mb-20"
        onSubmit={handleSubmit}
      >
        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])} // Handle file selection
          className="border border-gray-500 p-2 rounded"
        />
        <input
          type="text"
          value={imageName}
          onChange={(e) => setImageName(e.target.value)} // Handle image name change
          placeholder="Image Name"
          className="text-xl h-10 w-72 bg-white text-black border border-gray-400 p-2 rounded-md"
        />
        <button
          type="submit"
          className="bg-slate-500 text-xl text-white h-10 w-32 rounded hover:bg-slate-700 transition-colors"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Uploading..." : "Submit"}
        </button>
        {message && <p className="mt-4 text-lg">{message}</p>} {/* Display message */}
      </form>
    </div>
  );
};

export default UploadPhoto;
