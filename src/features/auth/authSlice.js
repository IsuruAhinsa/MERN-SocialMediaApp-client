const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_MODE: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    SET_LOGIN: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    SET_LOGOUT: (state) => {
      state.user = null;
      state.token = null;
    },
    SET_FRIENDS: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    SET_POSTS: (state, action) => {
      state.posts = action.payload.posts;
    },
    SET_POST: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) {
          return action.payload.post;
        }
        return post;
      });

      state.posts = updatedPosts;
    },
  },
});

export const {
  SET_MODE,
  SET_LOGIN,
  SET_LOGOUT,
  SET_FRIENDS,
  SET_POST,
  SET_POSTS,
} = authSlice.actions;
export default authSlice.reducer;
