import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  // one-state
  const [formData, setFormData] = useState({}); // inital empty obj
  const [error, setError] = useState(false); // error state
  const [loading, setLoading] = useState(false); // loading state
  const navigate = useNavigate(); // navigation purposes
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
      setLoading(true);
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

      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(true);
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
      </form>
      <div className="flex justify-center gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-4">{error && "Something went wrong!"}</p>
    </div>
  );
}
