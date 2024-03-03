import React, { useState } from "react";

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Placeholder for Firebase login functionality
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Implement Firebase authentication logic here
  };

  const loginContainerStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: 20,
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    borderRadius: 5,
    display: "flex", // Added for centering
    flexDirection: "column", // Added for centering
    alignItems: "center", // Center elements horizontally
  };

  return (
    <form style={loginContainerStyle} onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email address:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
};

export default Login;
