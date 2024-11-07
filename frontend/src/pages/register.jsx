import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../services/Endpoint";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    FullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dept: "",
    skills: "",
    year: "",
    status: "",
    resume_link: "",
    phone: "",
    whatsapp: "",
  });
  const [profile, setProfile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setProfile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const data = new FormData();
    data.append("FullName", formData.FullName);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("gender", formData.gender);
    data.append("dept", formData.dept);
    data.append("skills", formData.skills);
    data.append("year", formData.year);
    data.append("status", formData.status);
    data.append("resume_link", formData.resume_link);
    data.append("phone", formData.phone);
    data.append("whatsapp", formData.whatsapp);
    if (profile) data.append("profile", profile);

    try {
      await post("/auth/register", data);
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Failed to register. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <h2 className="text-center mb-4">Register</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="FullName"
                className="form-control"
                value={formData.FullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Department</label>
              <input
                type="text"
                name="dept"
                className="form-control"
                value={formData.dept}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Skills</label>
              <input
                type="text"
                name="skills"
                className="form-control"
                value={formData.skills}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Year</label>
              <input
                type="text"
                name="year"
                className="form-control"
                value={formData.year}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Gender</label>
              <select
                name="gender"
                className="form-select"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Status</label>
              <div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="status"
                    value="active"
                    checked={formData.status === "active"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Active</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    name="status"
                    value="inactive"
                    checked={formData.status === "inactive"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Inactive</label>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Profile Image</label>
              <input
                type="file"
                name="profile"
                className="form-control"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Resume Link</label>
              <input
                type="text"
                name="resume_link"
                className="form-control"
                value={formData.resume_link}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">WhatsApp</label>
              <input
                type="text"
                name="whatsapp"
                className="form-control"
                value={formData.whatsapp}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
