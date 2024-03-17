import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from "../redux/user/userSlice.js";

export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  // get state of File Image
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // get state of User
  const { currentUser, loading, error } = useSelector((state) => state.user);
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    let time = new Date().getTime();
    const fileName = `${time}${image.name}`; // time is always unique, so names will be unique
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, pfp: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // no refresh page
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/backend/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data)); // dont want to nav here, just stay here
      setUpdateSuccess(true);
      console.log(data);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/backend/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure());
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch("/backend/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center text-black pb-0 pt-5">
        Profile
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col pt-0 ps-2 pe-2 pb-2 gap-2"
      >
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        {/*
          
          Rules for image storage via firebase

           allow read;
           allow write: if
           request.resource.size < 2 * 1024 * 1024 && 
          request.resource.contentType.matches('image/.*'); // 1 kilo * 1 kilo = 1mb 

          */}
        <img
          src={formData.pfp || currentUser.pfp}
          alt="profile"
          className="w-24 h-24 cursor-pointer rounded-full object-cover self-center m-5"
          onClick={() => fileRef.current.click()}
        ></img>
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">
              Error uploading image (File must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-slate-700">{`Uploading: ${imagePercent}%`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-700">Image uploaded successfully</span>
          ) : (
            ``
          )}
        </p>
        <input
          defaultValue={currentUser.username} // show default val of user, pwd etc. (found in)
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <button className="bg-indigo-700 rounded-lg p-3 text-white uppercase hover:opacity-95 disabled:opacity-85">
          {loading ? "Loading..." : "Update"}
        </button>
        <div className="flex justify-between">
          <span
            onClick={handleDeleteAccount}
            className="text-red-700 cursor-pointer"
          >
            Delete Account
          </span>
          <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
            Sign Out
          </span>
        </div>
        <p className="text-red-700 mt-5">{error && "something went wrong"}</p>
        <p className="text-green-700 mt-5">
          {updateSuccess && "Successfully updated preferences"}
        </p>
      </form>
    </div>
  );
}
