import Avatar from "react-avatar";
import { FiSettings, FiAtSign } from "react-icons/fi";
import { useSelector } from "react-redux";

const GetProfile = () => {
  const { user } = useSelector((state) => state.user);
  console.log(user)

  return (
    <div className="container h-screen p-4 md:p-6">
      <div className="p-4 flex justify-between items-center fixed top-0 left-0 w-full h-12 bg-white border-b-2 shadow-md z-10 md:hidden">
        <FiSettings size={25} />
        <div className="font-bold">{user.username}</div>
        <FiAtSign size={25} />
      </div>
      <div className="mt-14 md:mt-8 w-full h-auto border-b-4 pb-4">
        <div className="flex flex-col md:flex-row justify-center items-center md:items-end gap-6 md:gap-20">
          <Avatar
            src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg"
            size="150"
            round={true}
          />
          <div className="flex flex-col justify-center items-center md:items-start space-y-2">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-4 mb-4 items-center">
              <h1 className="text-2xl font-bold">{user.username}</h1>
              <div className="flex flex-row gap-4">
                <button className="text-sm font-bold px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition duration-200">
                  Edit Profile
                </button>
                <button className="text-sm font-bold px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition duration-200">
                  View Archive
                </button>
                <FiSettings size={25} className="cursor-pointer" />
              </div>
            </div>
            <div className="flex gap-12 text-center md:text-left">
              <div className="font-semibold">9 posts</div>
              <div className="font-semibold">200 followers</div>
              <div className="font-semibold">300 following</div>
            </div>
            <div className="font-bold">{user?.name}</div>
            <div className="text-gray-600">Everything is temporary💯💯</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetProfile;
