import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_POSTS } from "../features/auth/authSlice";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch("https://mern-social-media-app-api-e9ni.onrender.com/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(SET_POSTS({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `https://mern-social-media-app-api-e9ni.onrender.com/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = response.json();
    dispatch(SET_POSTS({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="py-3 px-12">
      <ul className="space-y-4">
          {posts.map((post) => (
            <PostWidget
              key={post._id}
              post={post}
            />
          ))}
        </ul>
    </div>
  );
};

export default PostsWidget;
