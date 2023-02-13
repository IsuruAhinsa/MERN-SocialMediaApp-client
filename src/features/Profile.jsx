import React, { useEffect, useState } from 'react'
import Navbar from "../components/Navbar";
import UserWidget from "../widgets/UserWidget";
import FriendListWidget from "../widgets/FriendListWidget";
import PostsWidget from "../widgets/PostsWidget";
import CreatePostWidget from "../widgets/CreatePostWidget";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Profile = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

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
            <UserWidget userId={userId} picturePath={user.picturePath} />
            <div className="bg-gray-50 lg:min-w-0 lg:flex-1">
              <CreatePostWidget picturePath={user.picturePath} />
              <PostsWidget userId={userId} />
            </div>
          </div>
          <FriendListWidget userId={userId} />
        </div>
      </div>
    </>
  )
}

export default Profile