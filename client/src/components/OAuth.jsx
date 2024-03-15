import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice.js";

export default function OAuth() {
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/backend/auth/google", {
        method: "POST", // sending data, so post
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data));
    } catch (error) {
      console.log("Could not login with google.", error);
    }
  };
  return (
    // auth ui
    <button
      type="button"
      onClick={handleGoogleClick}
      className="text-white bg-red-600 rounded-lg p-3 uppercase hover:opacity-95"
    >
      Continue with Google
    </button>
  );
}
