import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BaseUrl, post } from "../services/Endpoint";
import { removeUser } from "../redux/AuthSlice";
import toast from "react-hot-toast";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [islogin, setIslogin] = useState(false);
  const user = useSelector((state) => state.auth.user);

  // Filter state
  const [filters, setFilters] = useState({
    year: "",
    dept: "",
    skills: "",
    status: ""
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
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  // Apply filters and navigate to the filtered users page
  const handleFilterApply = () => {
    const queryParams = new URLSearchParams(filters).toString();
    navigate(`/filter?${queryParams}`);
  };

  return (
    <nav className="navbar d-flex justify-content-between align-items-center p-3">
      <Link to={"/"}>
        <h1 className="mx-5 text-white fs-2 fw-bold">CodeBase</h1>
      </Link>

      <div className="d-flex align-items-center">
        {/* Filter Inputs */}
        <div className="d-flex">
          <input
            type="text"
            name="year"
            value={filters.year}
            placeholder="Year"
            onChange={handleFilterChange}
            className="form-control mx-2"
          />
          <input
            type="text"
            name="dept"
            value={filters.dept}
            placeholder="Department"
            onChange={handleFilterChange}
            className="form-control mx-2"
          />
          <input
            type="text"
            name="skills"
            value={filters.skills}
            placeholder="Skills"
            onChange={handleFilterChange}
            className="form-control mx-2"
          />
          <input
            type="text"
            name="status"
            value={filters.status}
            placeholder="Status"
            onChange={handleFilterChange}
            className="form-control mx-2"
          />
          <button className="btn btn-primary mx-2" onClick={handleFilterApply}>
            Apply Filters
          </button>
        </div>

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
