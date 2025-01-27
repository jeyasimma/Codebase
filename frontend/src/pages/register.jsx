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
    skills: [],
    year: "",
    status: "",
    resume_link: "",
    phone: "",
    whatsapp: "",
  });
  const [profile, setProfile] = useState(null);
  const [phoneError, setPhoneError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear phone number error when input changes
    if (name === "phone" || name === "whatsapp") {
      setPhoneError("");
    }
  };

  const handleFileChange = (e) => {
    setProfile(e.target.files[0]);
  };

  const handleTechStackChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFormData((prevData) => ({
      ...prevData,
      skills: prevData.skills.includes(value)
        ? prevData.skills.filter((skill) => skill !== value)
        : [...prevData.skills, value],
    }));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/; // Regex to validate 10-digit phone number
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number before submitting
    if (!validatePhoneNumber(formData.phone)) {
      setPhoneError("Phone number must be exactly 10 digits.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    if (profile) data.append("profile", profile);

    try {
      await post("/auth/register", data);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Account already exists with this email. Failed to register. Please try again.");
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="card shadow-lg p-4">
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
                <label className="form-label">Gender</label>
                <select
                  name="gender"
                  className="form-select"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Department</label>
                <select
                  name="dept"
                  className="form-select"
                  value={formData.dept}
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

              <div className="mb-3">
                <label className="form-label">Tech Stack</label>
                <select
                  name="skills"
                  className="form-select"
                  multiple
                  onChange={handleTechStackChange}
                  value={formData.skills}
                >
                  <option value="C">C</option>
                  <option value="C++">C++</option>
                  <option value="Java">Java</option>
                  <option value="Python">Python</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="HTML">HTML</option>
                  <option value="CSS">CSS</option>
                  <option value="React">React</option>
                  <option value="Express">Express</option>
                  <option value="Node">Node</option>
                  <option value="Angular">Angular</option>
                  <option value="Keras">Keras</option>
                  <option value="Pytorch">Pytorch</option>
                </select>
              </div>

              <div className="mb-3">
                <h5>Selected Tech Stacks:</h5>
                <div className="d-flex flex-wrap gap-2">
                  {formData.skills.map((stack, index) => (
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
                          setFormData((prevData) => ({
                            ...prevData,
                            skills: prevData.skills.filter((s) => s !== stack),
                          }));
                        }}
                      ></button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Availability</label>
                <div className="d-flex gap-3">
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="status"
                      value="Open to Work"
                      checked={formData.status === "Open to Work"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label">Open to Work</label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="status"
                      value="Not Available"
                      checked={formData.status === "Not Available"}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-check-label">Not Available</label>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                {phoneError && <div className="text-danger">{phoneError}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">WhatsApp</label>
                <input
                  type="tel"
                  className="form-control"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Year</label>
                <select
                  name="year"
                  className="form-select"
                  value={formData.year}
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

              <div className="mb-3">
                <label className="form-label">Resume Link</label>
                <input
                  type="url"
                  className="form-control"
                  name="resume_link"
                  value={formData.resume_link}
                  onChange={handleChange}
                  placeholder="Optional"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Profile Picture</label>
                <input
                  type="file"
                  className="form-control"
                  name="profile"
                  onChange={handleFileChange}
                />
              </div>

              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
