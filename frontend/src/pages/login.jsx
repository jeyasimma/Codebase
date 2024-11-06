import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/Endpoint";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/AuthSlice";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State to store form input values
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await post("/auth/login", formData);
      console.log("Login success", response);
      if (response.status === 200) {
        dispatch(setUser(response.data.user)); // Set user data in Redux store
        navigate("/"); // Redirect to the homepage
        toast.success(response.data.message); // Show success message
      }
    } catch (error) {
      console.error("Login error", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message); // Show error from server response
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <section className="bg-light min-vh-100 d-flex align-items-center justify-content-center py-4">
      <div className="card shadow-sm w-100" style={{ maxWidth: "400px" }}>
        <div className="card-body p-4">
          <h1 className="h5 mb-4 fw-bold text-dark">Sign in to your account</h1>

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="name@company.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100">
              Sign in
            </button>
          </form>

          {/* Link to Sign Up page */}
          <p className="mt-3 mb-0 text-muted">
            Don’t have an account yet?{" "}
            <Link to="/register" className="text-primary">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
