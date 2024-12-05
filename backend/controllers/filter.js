import UserModal from "../models/user.js";

export const filterUsers = async (req, res) => {
  try {
    const { year, dept, skills, status } = req.query;

    const query = {};
    if (year) query.year = year;
    if (dept) query.dept = dept;
    if (status) query.status = status;

    let users = await UserModal.find(query);

    if (skills) {
      // Check if skills parameter is not empty
      if (skills.trim()) {
        const skillsArray = skills
          .split(",")
          .map((skill) => skill.trim().toLowerCase()); // Normalize skills

        users = users.filter((user) =>
          skillsArray.every((skill) =>
            user.skills.map((s) => s.toLowerCase()).includes(skill)
          )
        );
      }
    }

    if (!users.length) {
      return res
        .status(404)
        .json({ success: false, message: "No matching users found" });
    }

    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Filter users error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
