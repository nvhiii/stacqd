import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth.jsx";

export default function SignIn() {
  // one-state
  const [formData, setFormData] = useState({}); // inital empty obj

  // structure a loading and error
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // test
  // console.log(formData);

  // we need data to be added to db here, so async fxn
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents refresh
    try {
      //set loading state to true before fetching data
      dispatch(signInStart());
      // request to backend
      const response = await fetch("/backend/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // convert data to json to see from backend
      const data = await response.json();

      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/opportunities");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      {/* sign in just needs email and pwd */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        ></input>
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        ></input>
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div className="flex justify-center gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-4">
        {error ? error.message || "Something went wrong!" : ""}
      </p>
    </div>
  );
}
