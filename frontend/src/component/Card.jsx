import { useState, useEffect } from "react";
import Avatar from "react-avatar";
import { FaRegComment, FaBookmark, FaRegHeart, FaHeart } from "react-icons/fa";
import { HiOutlineShare, HiOutlineDotsVertical } from "react-icons/hi";
import moment from "moment";
import { Link } from "react-router-dom";

const Card = ({ userId, imageUrl, imageName, createdAt, postId }) => {
  const [liked, setLiked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const copyToClipboard = () => {
    const postLink = `${window.location.origin}/post/${postId}`; // Assuming postId is unique
    navigator.clipboard.writeText(postLink)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Display success for 2 seconds
      })
      .catch((error) => {
        console.error("Failed to copy: ", error);
      });
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const timeAgo = moment(createdAt).fromNow();

  return (
    <div className="flex items-center flex-col">
      <div className="flex flex-row justify-start items-start h-10 w-full">
        <div className="flex flex-row justify-start items-start h-10 w-full">
          <div>
            <Link to={`/profile/${userId}`}>
              <Avatar
                src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg"
                size="30"
                round={true}
              />
            </Link>
          </div>
          <div className="ml-2">
            <Link to={`/profile/${userId}`}>
              <span className="font-bold">{userId}</span>
            </Link>
            <span className="text-gray-500 ml-2">{timeAgo}</span>
          </div>
        </div>
        <div className="cursor-pointer" onClick={toggleMenu}>
          <HiOutlineDotsVertical size={30} />
        </div>
      </div>
      {isOpen && (
        <div className="fixed bg-black text-white w-64 rounded-lg shadow-lg py-2 z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <ul className="space-y-1">
            <li className="text-red-500 px-4 py-2 cursor-pointer hover:bg-gray-700 transition-all">
              Report
            </li>
            <li className="px-4 py-2 cursor-pointer hover:bg-gray-700 transition-all">
              Not interested
            </li>
            <li className="px-4 py-2 cursor-pointer hover:bg-gray-700 transition-all">
              Go to post
            </li>
            <li className="px-4 py-2 cursor-pointer hover:bg-gray-700 transition-all" onClick={copyToClipboard}>
              {copySuccess ? "Link copied!" : "Copy link"}
            </li>
            <li className="px-4 py-2 cursor-pointer hover:bg-gray-700 transition-all">
              Embed
            </li>
            <li className="px-4 py-2 cursor-pointer hover:bg-gray-700 transition-all">
              About this account
            </li>
            <li className="px-4 py-2 cursor-pointer hover:bg-gray-700 transition-all" onClick={handleCancel}>
              Cancel
            </li>
          </ul>
        </div>
      )}
      <figure className="w-[400px] md:w-[470px] h-auto mb-5">
        <img
          className="w-full h-auto object-cover rounded-lg border border-blue-900 shadow-md transition-shadow"
          src={imageUrl}
          alt={imageName}
        />
        <div className="w-full h-10 flex flex-row justify-between items-end">
          <div className="w-1/3 h-10 flex flex-row justify-between items-end">
            <button onClick={handleLikeClick}>
              {liked ? (
                <FaHeart size={24} className="text-red-500" />
              ) : (
                <FaRegHeart size={24} className="text-gray-500" />
              )}
            </button>
            <HiOutlineShare size={24} />
            <FaRegComment size={24} />
          </div>
          <FaBookmark size={24} />
        </div>
        <div className="font-bold mt-1">10,000 likes</div>
        <div className="text-gray-900 mt-1">
          <span className="font-bold">{userId}</span> {imageName}
        </div>
      </figure>
    </div>
  );
};

export default Card;
