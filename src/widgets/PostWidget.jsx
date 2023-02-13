import {
  ChatBubbleOvalLeftIcon,
  EyeIcon,
  HeartIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_POST } from "../features/auth/authSlice";
import FriendWidget from "./FriendWidget";

const PostWidget = ({ post }) => {
  const {
    _id,
    picturePath,
    description,
    createdAt,
    firstName,
    lastName,
    comments,
    likes,
    userPicturePath,
    userId
  } = post;

  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const updateLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${_id}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(SET_POST({ post: updatedPost }));
  };

  return (
    <li className="bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg">
      <FriendWidget
        createdAt={createdAt}
        fullName={`${firstName} ${lastName}`}
        userPicturePath={userPicturePath}
        friendId={userId}
      />

      <div
        className="mt-2 text-sm text-gray-700 space-y-4"
        dangerouslySetInnerHTML={{ __html: description }}
      />

      <div>
        <img
          src={`http://localhost:3001/assets/${picturePath}`}
          className="mt-3"
          alt=""
        />
      </div>

      <div className="mt-6 flex justify-between space-x-8">
        <div className="flex space-x-6">
          <span className="inline-flex items-center text-sm">
            <button
              onClick={() => updateLike()}
              type="button"
              className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
            >
              {isLiked ? (
                <SolidHeartIcon
                  className="h-5 w-5 text-red-500"
                  aria-hidden="true"
                />
              ) : (
                <HeartIcon className="h-5 w-5" aria-hidden="true" />
              )}

              <span className="font-medium text-gray-900">{likeCount}</span>
              <span className="sr-only">likes</span>
            </button>
          </span>
          <span className="inline-flex items-center text-sm">
            <button
              onClick={() => setIsComments(!isComments)}
              type="button"
              className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
            >
              <ChatBubbleOvalLeftIcon className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium text-gray-900">
                {comments.length}
              </span>
              <span className="sr-only">replies</span>
            </button>
          </span>
          <span className="inline-flex items-center text-sm">
            <button
              type="button"
              className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
            >
              <EyeIcon className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium text-gray-900">12</span>
              <span className="sr-only">views</span>
            </button>
          </span>
        </div>
        <div className="flex text-sm">
          <span className="inline-flex items-center text-sm">
            <button
              type="button"
              className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
            >
              <ShareIcon className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium text-gray-900">Share</span>
            </button>
          </span>
        </div>
      </div>
    </li>
  );
};

export default PostWidget;
