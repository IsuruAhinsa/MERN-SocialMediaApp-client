import { PaperClipIcon, MicrophoneIcon } from "@heroicons/react/24/solid";
import { FilmIcon, PhotoIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { SET_POSTS } from "../features/auth/authSlice";
import Dropzone from "react-dropzone";

const CreatePostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);

    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const posts = await response.json();
    dispatch(SET_POSTS({ posts }));
    setImage(null);
    setPost("");
  };
  
  return (
    <div className="flex items-start space-x-4 mx-8 sm:my-10 sm:mx-20">
      <div className="flex-shrink-0">
        <img
          className="inline-block h-10 w-10 rounded-full"
          src={`http://localhost:3001/assets/${picturePath}`}
          alt=""
        />
      </div>
      <div className="min-w-0 flex-1 relative">
        <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
          <label htmlFor="description" className="sr-only">
            What's on your mind...
          </label>
          <textarea
            rows={2}
            name="description"
            id="description"
            className="block w-full border-0 pt-3.5 resize-none placeholder-gray-500 focus:ring-0 sm:text-sm"
            placeholder="What's on your mind..."
            onChange={(e) => setPost(e.target.value)}
            value={post}
          />

          {/* Spacer element to match the height of the toolbar */}
          <div aria-hidden="true">
            <div className="py-2">
              <div className="h-9" />
            </div>
            <div className="h-px" />
            <div className="py-2">
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-px">
          <div className="flex flex-nowrap justify-end py-2 px-2 space-x-2 sm:px-3">
            <div className="flex-shrink-0 hidden sm:block">
              <div className="relative">
                <button className="relative inline-flex items-center rounded-full py-2 px-2 bg-gray-50 text-sm font-medium text-gray-500 whitespace-nowrap hover:bg-gray-100 sm:px-3">
                  <MicrophoneIcon
                    className="flex-shrink-0 h-5 w-5 text-gray-300 sm:-ml-1"
                    aria-hidden="true"
                  />
                  <span className="text-gray-500 ml-2">Audio</span>
                </button>
              </div>
            </div>

            <div className="flex-shrink-0 hidden sm:block">
              <div className="relative">
                <button className="relative inline-flex items-center rounded-full py-2 px-2 bg-gray-50 text-sm font-medium text-gray-500 whitespace-nowrap hover:bg-gray-100 sm:px-3">
                  <PaperClipIcon
                    className="flex-shrink-0 h-5 w-5 text-gray-300 sm:-ml-1"
                    aria-hidden="true"
                  />
                  <span className="text-gray-500 ml-2">Attachment</span>
                </button>
              </div>
            </div>

            <div className="flex-shrink-0 hidden sm:block">
              <div className="relative">
                <button className="relative inline-flex items-center rounded-full py-2 px-2 bg-gray-50 text-sm font-medium text-gray-500 whitespace-nowrap hover:bg-gray-100 sm:px-3">
                  <FilmIcon
                    className="flex-shrink-0 h-5 w-5 text-gray-300 sm:-ml-1"
                    aria-hidden="true"
                  />
                  <span className="text-gray-500 ml-2">Clip</span>
                </button>
              </div>
            </div>

            <div className="flex-shrink-0" onClick={() => setIsImage(!isImage)}>
              <div className="relative">
                <button className="relative inline-flex items-center rounded-full py-2 px-2 bg-gray-50 text-sm font-medium text-gray-500 whitespace-nowrap hover:bg-gray-100 sm:px-3">
                  <PhotoIcon
                    className="flex-shrink-0 h-5 w-5 text-gray-300 sm:-ml-1"
                    aria-hidden="true"
                  />
                  <span className="text-gray-500 ml-2">Image</span>
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 px-2 py-2 flex justify-between items-center space-x-3 sm:px-3">
            {isImage && (
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
              >
                {({ getRootProps, getInputProps }) => (
                  <div className="flex">
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <button
                        type="button"
                        className="-ml-2 -my-2 rounded-full px-3 py-2 inline-flex items-center text-left text-gray-400 group"
                      >
                        {!image ? (
                          <>
                            <PaperClipIcon
                              className="-ml-1 h-5 w-5 mr-2 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                            <span className="text-sm text-gray-500 group-hover:text-gray-600 italic">
                              Attach a file
                            </span>
                          </>
                        ) : (
                          <>
                            <PhotoIcon
                              className="-ml-1 h-5 w-5 mr-2 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                            <span className="text-sm text-gray-500 group-hover:text-gray-600 italic">
                              {image.name}
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                    {image && (
                      <XCircleIcon
                        onClick={() => setImage(null)}
                        className="h-5 w-5 mr-2 text-red-500 hover:cursor-pointer"
                      />
                    )}
                  </div>
                )}
              </Dropzone>
            )}
            <div className="flex-shrink-0">
              <button
                onClick={handlePost}
                disabled={!post}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                POST
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostWidget;
