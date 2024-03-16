import { useSelector } from "react-redux";

export default function Profile() {
  // get state
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center text-black pb-0 pt-5">
        Profile
      </h1>
      <form className="flex flex-col pt-0 ps-2 pe-2 pb-2 gap-2">
        <img
          src={currentUser.pfp}
          alt="pfp"
          className="w-24 h-24 cursor-pointer rounded-full object-cover self-center m-5"
        ></img>
        <input
          defaultValue={currentUser.username} // show default val of user, pwd etc. (found in)
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
        />
        <button className="bg-indigo-700 rounded-lg p-3 text-white uppercase hover:opacity-95 disabled:opacity-85">
          Update
        </button>
        <div className="flex justify-between">
          <span className="text-red-700 cursor-pointer">Delete Account</span>
          <span className="text-red-700 cursor-pointer">Sign Out</span>
        </div>
      </form>
    </div>
  );
}
