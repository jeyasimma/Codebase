// import React, { useState } from "react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/Endpoint";
import toast from "react-hot-toast";
// import "./App.css"; // Import the CSS file for global styling

export default function Register() {
  const [formDataValue, setformDataValue] = useState({
    email: "",
    FullName: "",
    gender: "",
    dept: "",
    skills: [],
    status: "",
    phone: "",
    whatsapp: "",
    year: "",
    resume_link: "",
    password: "",
    confirmPassword: "",
    profile: "null",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setformDataValue({
      ...formDataValue,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleTechStackChange = (e) => {
    const value = e.target.value;
    if (formDataValue.skills.includes(value)) {
      setformDataValue({
        ...formDataValue,
        skills: formDataValue.skills.filter((stack) => stack !== value),
      });
    } else {
      setformDataValue({
        ...formDataValue,
        skills: [...formDataValue.skills, value],
      });
    }
  };

  const handleSubmit32 = async (e) => {
    e.preventDefault();

    if (formDataValue.password !== formDataValue.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const formData = new FormData();
    // formData.append("FullName", formDataValue.FullName);
    formData.append(formDataValue.FullName, "FullName");
    // formData.append("email", formDataValue.email);
    // formData.append("gender", formDataValue.gender);
    // formData.append("profile", formDataValue.profile);
    formData.forEach((key, val) => {
      console.log(key, val);
    });
    try {
      console.log(formDataValue);
      // console.log(formData);
      const response = await post("/auth/register", formData);
      // console.log('hpop',response);
      // console.log('bjn');
      const data = response.data;
      if (data.success) {
        console.log(data.message);
        navigate("/login");
        toast.success(data.message);
      }
      console.log("register api", data);
    } catch (error) {
      console.log(error);
      console.error("login error", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // setError(error.response.data.message); // Set error message from server response
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }

    // setError("");
    console.log("ahkdagdgagkjdgavdjkg");
    console.log(formDataValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password and confirmPassword match
    if (formDataValue.password !== formDataValue.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Create FormData object for file upload
    const formData = new FormData();
    formData.append("FullName", formDataValue.FullName);
    formData.append("email", formDataValue.email);
    formData.append("gender", formDataValue.gender);
    formData.append("dept", formDataValue.dept);
    formData.append("skills", JSON.stringify(formDataValue.skills)); // Assuming skills is an array
    formData.append("status", formDataValue.status);
    formData.append("phone", formDataValue.phone);
    formData.append("whatsapp", formDataValue.whatsapp);
    formData.append("year", formDataValue.year);
    formData.append("resume_link", formDataValue.resume_link);
    formData.append("password", formDataValue.password);
    formData.append(
      "profile",
      formDataValue.profile ? formDataValue.profile : null
    ); // Append profile picture (if available)

    try {
      fetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(formDataValue),
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(async (response) => {
        // const response = await post("/auth/register", formData);
        if (response.ok) {
          const data = response.data;
          if (data.success) {
            console.log(data.message);
            toast.success(data.message); // Show success toast
            navigate("/login"); // Navigate to login page after successful registration
          } else {
            toast.error(data.message); // Show error message if the backend returns failure
          }
        }
      });
    } catch (error) {
      console.error("Registration Error: ", error);

      if (error.response && error.response.data) {
        // If error response from server, show error message
        toast.error(error.response.data.message);
      } else {
        // Handle unexpected errors
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4">Register</h2>
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="FullName"
                  value={formDataValue.FullName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Gender */}
              <div className="mb-3">
                <label className="form-label">Gender</label>
                <select
                  className="form-select"
                  name="gender"
                  value={formDataValue.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              {/* Department */}
              <div className="mb-3">
                <label className="form-label">Department</label>
                <select
                  className="form-select"
                  name="dept"
                  value={formDataValue.dept}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Aerospace Engineering and Applied Mechanics">
                    Aerospace Engineering and Applied Mechanics
                  </option>
                  <option value="Architecture and Planning">
                    Architecture and Planning
                  </option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Computer Science and Technology">
                    Computer Science and Technology
                  </option>
                  <option value="Electrical Engineering">
                    Electrical Engineering
                  </option>
                  <option value="Electronics and Telecommunication Engineering">
                    Electronics and Telecommunication Engineering
                  </option>
                  <option value="Information Technology">
                    Information Technology
                  </option>
                  <option value="Mechanical Engineering">
                    Mechanical Engineering
                  </option>
                  <option value="Metallurgy and Materials Engineering">
                    Metallurgy and Materials Engineering
                  </option>
                  <option value="Mining Engineering">Mining Engineering</option>
                </select>
              </div>

              {/* Tech Stack */}
              <div className="mb-3">
                <label className="form-label">Tech Stack</label>
                <select
                  className="form-select"
                  name="skills"
                  multiple
                  onChange={handleTechStackChange}
                >
                  <option value="C">C</option>
                  <option value="C++">C++</option>
                  <option value="Java">Java</option>
                  <option value="Python">Python</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="UI/UX">UI/UX</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Full-Stack Web Development">
                    Full-Stack Web Development
                  </option>
                  <option value="App Development">App Development</option>
                  <option value="Game Development">Game Development</option>
                  <option value="Spring Boot">Spring Boot</option>
                  <option value="Django">Django</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                </select>
              </div>

              {/* Selected Tech Stacks */}
              <div className="mb-3">
                <h5>Selected Tech Stacks:</h5>
                <div className="d-flex flex-wrap gap-2">
                  {formDataValue.skills.map((stack, index) => (
                    <span
                      key={index}
                      className="badge bg-secondary d-flex align-items-center"
                    >
                      {stack}
                      <button
                        type="button"
                        className="btn-close btn-close-white ms-2"
                        aria-label="Close"
                        onClick={() => {
                          setformDataValue({
                            ...formDataValue,
                            skills: formDataValue.skills.filter(
                              (s) => s !== stack
                            ),
                          });
                        }}
                      ></button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="mb-3">
                <label className="form-label">Availability</label>
                <div className="d-flex gap-3">
                  <div className="form-check">
                    <input
                      type="radio"
                      name="status"
                      value="Open to Work"
                      checked={formDataValue.status === "Open to Work"}
                      onChange={handleChange}
                      className="form-check-input"
                      required
                    />
                    <label className="form-check-label">Open to Work</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      name="status"
                      value="Not Available"
                      checked={formDataValue.status === "Not Available"}
                      onChange={handleChange}
                      className="form-check-input"
                      required
                    />
                    <label className="form-check-label">Not Available</label>
                  </div>
                </div>
              </div>

              {/* Phone Number */}
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={formDataValue.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* WhatsApp Number */}
              <div className="mb-3">
                <label className="form-label">WhatsApp Number</label>
                <input
                  type="tel"
                  className="form-control"
                  name="whatsapp"
                  value={formDataValue.whatsapp}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Year */}
              <div className="mb-3">
                <label className="form-label">Year</label>
                <select
                  className="form-select"
                  name="year"
                  value={formDataValue.year}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Year</option>
                  <option value="First Year">First Year</option>
                  <option value="Second Year">Second Year</option>
                  <option value="Third Year">Third Year</option>
                  <option value="Fourth Year">Fourth Year</option>
                  <option value="Graduated">Graduated</option>
                </select>
              </div>

              {/* Resume Link */}
              <div className="mb-3">
                <label className="form-label">
                  Resume Link (Make the link accessible to all)
                </label>
                <input
                  type="url"
                  className="form-control"
                  name="resume_link"
                  value={formDataValue.resume_link}
                  onChange={handleChange}
                  placeholder="Optional"
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formDataValue.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formDataValue.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  value={formDataValue.confirmPassword}
                  onChange={handleChange}
                  required
                />
                {error && <div className="text-danger mt-1">{error}</div>}
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-100">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
