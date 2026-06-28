import { createSlice } from "@reduxjs/toolkit";
import userService from "../api/users";
const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
    addUsers(state, action) {
      return state.concat(action.payload);
    },
  },
});

export const { setUsers, addUsers } = usersSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    const usersFromService = await userService.getAll();
    dispatch(setUsers(usersFromService));
  };
};
export default usersSlice.reducer;
