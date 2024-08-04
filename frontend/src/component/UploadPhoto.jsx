import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import USER_API_END_POINT from "../utils/Constant"
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const UploadPhoto = () => {
  const [imageFile, setImageFile] = useState(null); // State to store file
  const [imageName, setImageName] = useState(""); // State to store image name
  const [loading, setLoading] = useState(false); // State for loading status
  const {user} =useSelector((store)=>store.user)
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!imageFile || !imageName) {
      toast.error("Both image file and image name are required.");
      return;
    }

    setLoading(true); // Set loading to true
    const formData = new FormData();
    formData.append("imageUrl", imageFile); // Append file to FormData
    formData.append("imageName", imageName); // Append image name to FormData
    formData.append("userId", user.username); // Append image name to FormData

    try {
      const response = await fetch(`${USER_API_END_POINT}/uploadImage`, {
        method: "POST",
        body: formData, // Send FormData with the file
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.Errors}`);
      }

      const result = await response.json();

      if (result.success) {
        toast.success("Image uploaded successfully.");
        setImageFile(null); // Reset file input
        setImageName(""); // Reset image name
        navigate("/"); // Navigate to the home route on successful upload
      } else {
        toast.error(`Error uploading image: ${result.message}`);
      }
    } catch (error) {
      toast.error(`Error during image upload: ${error.message}`);
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
      </form>
    </div>
  );
};

export default UploadPhoto;
