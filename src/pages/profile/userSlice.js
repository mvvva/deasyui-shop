import { createSlice } from "@reduxjs/toolkit";
import { saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage } from "../../utils/helper";

const initialUserData = {
  userData: getFromLocalStorage('user'),
  error: null
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserData,
  reducers: {
    addUser: function (state, action) {
      state.userData = action.payload;
      saveToLocalStorage('user', state.userData);
      if (state.userData.token) {
        saveToLocalStorage('token', state.userData.token);
      }
    },
    setUserError: function (state, action) {
      state.error = action.payload;
    },
    removeSlice: function (state) {
      state.userData = null;
      state.error = null;
      removeFromLocalStorage('user');
      removeFromLocalStorage('token');
    },
  },
});

export const { addUser, setUserError, removeSlice } = userSlice.actions;
export default userSlice.reducer;
