import React, { useState } from "react";
import { loginUser } from "../service/userService";
import "../styles/Login.css";
import CustomButton from "../components/CustomButton";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("userId", response.data.id);
      setSuccess("Login successful");
      setError("");
    } catch (error) {
      setError("Login failed. Invalid username or password.");
      setSuccess("");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="custom-login-card">
            <div className="card-body">
              <h3 className="text-center">Login</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <p></p>
                <CustomButton type="submit" content="Login"></CustomButton>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
