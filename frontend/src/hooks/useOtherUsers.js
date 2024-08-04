import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setOtherUser } from "../redux/userSlice";
import USER_API_END_POINT from "../utils/Constant";

const useOtherUsers = (userId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const response = await fetch(
          `${USER_API_END_POINT}/otheruser/${userId}`,
          {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the content type if sending JSON
              },
          }
        );
        console.log(response);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

        const data = await response.json();
        console.log(data.data);
        dispatch(setOtherUser(data.data));
      } catch (error) {
        console.log(error);
      }
    };

    if (userId) {
      fetchOtherUsers();
    }
  }, [userId, dispatch]);
};

export default useOtherUsers;
