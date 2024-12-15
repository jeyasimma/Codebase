import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select"; // Import react-select for multichoice fields
import { BaseUrl, post } from "../services/Endpoint";
import { removeUser } from "../redux/AuthSlice";
import toast from "react-hot-toast";

const yearOptions = [
  { value: "First Year", label: "First Year" },
  { value: "Second Year", label: "Second Year" },
  { value: "Third Year", label: "Third Year" },
  { value: "Fourth Year", label: "Fourth Year" },
  { value: "Graduated", label: "Graduated" },
];

const departmentOptions = [
  { value: "Computer Science and Technology", label: "CST" },
  { value: "Information Technology", label: "IT" },
  { value: "Electronics and Telecommunication Engineering", label: "ETC" },
  { value: "Electrical Engineering", label: "EE" },
  { value: "Mechanical Engineering", label: "ME" },
  { value: "Civil Engineering", label: "CE" },
  { value: "Metallurgy and Materials Engineering", label: "MME" },
  { value: "Mining Engineering", label: "MIN" },
  { value: "Aerospace Engineering and Applied Mechanics", label: "AE&AM" },
  { value: "Architecture and Planning", label: "A&P" },
  // Add more departments as needed
];

const statusOptions = [
  { value: "Open to Work", label: "Open to Work" },
  { value: "Not Available", label: "Not Available" },
];

const skillsOptions = [
  { value: "C++", label: "C++" },
  { value: "C", label: "C" },
  { value: "Java", label: "Java" },
  { value: "Python", label: "Python" },
  { value: "Javascript", label: "Javascript" },
  { value: "HTML", label: "HTML" },
  { value: "CSS", label: "CSS" },
  { value: "React", label: "React" },
  { value: "Express", label: "Express" },
  { value: "Node", label: "Node" },
  { value: "Angular", label: "Angular" },
  { value: "Tensorflow", label: "Tensorflow" },
  { value: "Keras", label: "Keras" },
  { value: "Pytorch", label: "Pytorch" },
  // Add more skills as needed
];

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [islogin, setIslogin] = useState(false);
  const user = useSelector((state) => state.auth.user);

  // Filter state
  const [filters, setFilters] = useState({
    year: "",
    dept: "",
    skills: [],
    status: "",
  });

  const handleLogout = async () => {
    try {
      const request = await post("/auth/logout");
      const response = request.data;
      if (request.status === 200) {
        navigate("/login");
        dispatch(removeUser());
        toast.success(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Update filter state based on user input
  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Apply filters and navigate to the filtered users page
  const handleFilterApply = () => {
    const queryParams = new URLSearchParams({
      year: filters.year,
      dept: filters.dept,
      status: filters.status,
      skills: filters.skills
        .map((skill) => skill.value.trim().toLowerCase()) // Normalize skills
        .join(","),
    }).toString();

    navigate(`/filter?${queryParams}`);
    // console.log(filters);
  };

  return (
    <nav className="navbar d-flex justify-content-between align-items-center p-3">

      <Link to={"/"}>
        <h1 className="mx-5 text-white fs-2 fw-bold">CodeBase</h1>
      </Link>

      <div className="d-flex align-items-center">
        {/* Filter Inputs */}
        <div className="d-flex">
          {/* Year Dropdown */}
          <div className="mx-2" style={{ minWidth: "200px" }}>
            <select
              name="year"
              value={filters.year}
              onChange={(e) => handleFilterChange("year", e.target.value)}
              className="form-select"
            >
              <option value="">Select Year</option>
              {yearOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Department Dropdown */}
          <div className="mx-2" style={{ minWidth: "200px" }}>
            <select
              name="dept"
              value={filters.dept}
              onChange={(e) => handleFilterChange("dept", e.target.value)}
              className="form-select"
            >
              <option value="">Select Department</option>
              {departmentOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {/* Skills Multiselect */}
          <div className="mx-2" style={{ minWidth: "200px" }}>
            <Select
              isMulti
              options={skillsOptions}
              value={filters.skills}
              onChange={(selectedOptions) =>
                handleFilterChange("skills", selectedOptions)
              }
              placeholder="Select Skills"
            />
          </div>

          {/* Status Dropdown */}
          <div className="mx-2" style={{ minWidth: "200px" }}>
            <select
              name="status"
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="form-select"
            >
              <option value="">Select Status</option>
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button className="btn btn-primary mx-2" onClick={handleFilterApply}>
            Apply Filters
          </button>
        </div>
        <Link to={"/"}>
          <button class="btn btn-primary mx-2">
            Home
          </button>
        </Link>
        {!user ? (
          <Link to={"/login"}>
            <button className="btn_sign mx-3">Login</button>
          </Link>
        ) : (
          <div className="dropdown">
            <div
              className="avatar-container pointer rounded-circle overflow-hidden bg-info"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ width: "40px", height: "40px", cursor: "pointer" }}
            >
              <img
                className="img-fluid h-100 w-100"
                src={`${BaseUrl}/images/${user.profile}`}
                alt="Profile"
                style={{ objectFit: "cover" }}
              />
            </div>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
              {user.role === "admin" && (
                <li>
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
              )}
              <li>
                <Link className="dropdown-item" to={`/user/${user._id}`}>
                  Profile
                </Link>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                >
                  Sign Out
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
