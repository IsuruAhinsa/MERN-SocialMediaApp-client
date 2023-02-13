import React, { useEffect, useState } from "react";
import { BriefcaseIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SET_LOGOUT } from "../features/auth/authSlice";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;

  return (
    <div className="xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200 bg-white">
      <div className="pl-4 pr-6 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-8">
            <div className="space-y-8 sm:space-y-0 sm:flex sm:justify-between sm:items-center xl:block xl:space-y-8">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 h-12 w-12">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src={`http://localhost:3001/assets/${picturePath}`}
                    alt=""
                  />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-gray-900">
                    {firstName} {lastName}
                  </div>
                  <div className="group flex items-center space-x-2.5 hover:cursor-pointer">
                    <UsersIcon className="w-5" />
                    <span className="text-sm text-gray-500 group-hover:text-gray-900 font-medium">
                      Friends {friends.length}
                    </span>
                  </div>
                </div>
              </div>
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row xl:flex-col">
                <button
                  onClick={() => navigate(`/profile/${userId}`)}
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 xl:w-full"
                >
                  Profile
                </button>
                <button
                  onClick={() => dispatch(SET_LOGOUT())}
                  type="button"
                  className="mt-3 inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 xl:ml-0 xl:mt-3 xl:w-full"
                >
                  Logout
                </button>
              </div>
            </div>
            {/* Meta info */}
            <div className="flex flex-col space-y-6 sm:flex-row sm:space-y-0 sm:space-x-8 xl:flex-col xl:space-x-0 xl:space-y-6">
              <div className="flex items-center space-x-2">
                <MapPinIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span className="text-sm text-gray-500 font-medium">
                  {location}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <BriefcaseIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span className="text-sm text-gray-500 font-medium">
                  {occupation}
                </span>
              </div>
            </div>

            <div className="flex flex-col space-y-2 sm:flex-row xl:flex-col border-t pt-5">
              <div className="flex justify-between">
                <p className="text-sm">Who viewed your profile</p>
                <span className="text-sm text-gray-500">
                  {viewedProfile}
                </span>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">Impressions of your posts</p>
                <span className="text-sm text-gray-500">
                  {impressions}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWidget;
