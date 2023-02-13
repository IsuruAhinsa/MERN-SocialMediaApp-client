import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import UserWidget from "../widgets/UserWidget";
import FriendListWidget from "../widgets/FriendListWidget";
import PostsWidget from "../widgets/PostsWidget";
import CreatePostWidget from "../widgets/CreatePostWidget";

const Home = () => {
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <>
      <div
        className="fixed top-0 left-0 w-1/2 h-full bg-white"
        aria-hidden="true"
      />
      <div
        className="fixed top-0 right-0 w-1/2 h-full bg-gray-50"
        aria-hidden="true"
      />
      <div className="relative min-h-full flex flex-col">
        <Navbar />
        <div className="flex-grow w-full mx-auto xl:px-8 lg:flex">
          <div className="flex-1 min-w-0 bg-white xl:flex">
            <UserWidget userId={_id} picturePath={picturePath} />
            <div className="bg-gray-50 lg:min-w-0 lg:flex-1">
              <CreatePostWidget picturePath={picturePath} />
              <PostsWidget userId={_id} />
            </div>
          </div>
          <FriendListWidget userId={_id} />
        </div>
      </div>
    </>
  );
};

export default Home;
