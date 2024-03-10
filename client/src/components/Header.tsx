import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center mx-auto max-w-6xl">
        <Link to="/">
          <h1 className="font-bold">Header</h1>
        </Link>
        <ul className="flex gap-2">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/sign-in">
            <li>Sign In</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
