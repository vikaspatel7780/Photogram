import { useState } from "react";
import Avatar from "react-avatar";
import { FaRegComment, FaBookmark, FaRegHeart, FaHeart } from "react-icons/fa";
import { HiOutlineShare, HiOutlineDotsVertical } from "react-icons/hi";
import moment from "moment";
import { Link } from "react-router-dom";

const Card = ({ userId, imageUrl, imageName, key, createdAt }) => {
  const [liked, setLiked] = useState(false);
  const handleLikeClick = () => {
    setLiked(!liked);
  };
  const timeAgo = moment(createdAt).fromNow(); // e.g., "5 minutes ago"

  return (
    <div>
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
        <div>
          {" "}
          <HiOutlineDotsVertical size={30} />
        </div>
      </div>
      <figure className="w-[400px] md:w-[470px] h-auto mb-5">
        <img
          className="w-full h-auto object-cover rounded-lg border border-blue-900 shadow-md transition-shadow "
          src={imageUrl}
          alt={imageName}
        />
        <div className=" w-full h-10 flex flex-row justify-between items-end text-end">
          <div className="w-1/3 h-10 flex flex-row justify-between items-end text-end">
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
