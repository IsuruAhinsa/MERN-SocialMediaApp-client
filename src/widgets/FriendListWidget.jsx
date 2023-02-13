import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_FRIENDS } from "../features/auth/authSlice";
import FriendWidget from "./FriendWidget";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    const response = await fetch(
      `https://mern-social-media-app-api-e9ni.onrender.com/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(SET_FRIENDS({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="bg-gray-50 pr-4 sm:pr-6 lg:pr-8 lg:flex-shrink-0 lg:border-l lg:border-gray-200 xl:pr-0">
      <div className="bg-white rounded-lg shadow mx-3 my-4">
        <div className="p-6 pb-12">
          <h2 className="text-base font-medium text-gray-900">Friends</h2>
          <div className="mt-6 flow-root">
            <ul className="-my-4 divide-y divide-gray-200">
              {friends.length > 0 ? (
                friends.map((friend) => (
                  <FriendWidget
                    key={friend._id}
                    createdAt={friend.occupation}
                    fullName={`${friend.firstName} ${friend.lastName}`}
                    userPicturePath={friend.picturePath}
                    friendId={friend._id}
                  />
                ))
              ) : (
                <p className="text-gray-500">Not yet any friends for you.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendListWidget;
