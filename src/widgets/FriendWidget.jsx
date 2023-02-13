import { UserMinusIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_FRIENDS } from "../features/auth/authSlice";

const FriendWidget = ({ userPicturePath, fullName, createdAt, friendId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const isFriend = Array.isArray(friends)
    ? friends.find((friend) => friend._id === friendId)
    : 0;

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(SET_FRIENDS({ friends: data }));
  };
  return (
    <div className="flex space-x-3">
      <div className="flex-shrink-0">
        <img
          className="h-10 w-10 rounded-full"
          src={`http://localhost:3001/assets/${userPicturePath}`}
          alt=""
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-gray-900 flex">
          <p
            onClick={() => {
              navigate(`/profile/${friendId}`);
              navigate(0);
            }}
            className="hover:cursor-pointer hover:underline"
          >
            {fullName}
          </p>
        </div>
        <div className="text-sm text-gray-500">
          <p className="hover:cursor-pointer hover:underline">{createdAt}</p>
        </div>
      </div>
      {_id !== friendId && (
        <div
          className="flex-shrink-0 self-center flex"
          onClick={() => patchFriend()}
        >
          {isFriend ? (
            <UserMinusIcon className="w-5 hover:text-red-500 cursor-pointer" />
          ) : (
            <UserPlusIcon className="w-5 hover:text-green-500 cursor-pointer" />
          )}
        </div>
      )}
    </div>
  );
};

export default FriendWidget;
