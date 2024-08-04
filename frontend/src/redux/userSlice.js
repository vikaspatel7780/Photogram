import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  otherUsers: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setOtherUser: (state, action) => {
      state.otherUsers = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    }
  }
});

export const { setUser,clearUser,setOtherUser} = userSlice.actions;
export default userSlice.reducer;
