import UserModal from "../models/user.js";

export const filterUsers = async (req, res) => {
  try {
    const { year, dept, skills, status } = req.query;

    const query = {};
    if (year) query.year = year;
    if (dept) query.dept = dept;
    if (status) query.status = status;

    let users = await UserModal.find(query);

    // if (skills) {
    //   // Check if skills parameter is not empty
    //   if (skills.trim()) {
    //     const skillsArray = skills
    //       .split(",")
    //       .map((skill) => skill.trim().toLowerCase()); // Normalize skills

    //     users = users.filter((user) =>
    //       skillsArray.every((skill) =>
    //         user.skills.map((s) => s.toLowerCase()).includes(skill)
    //       )
    //     );
    //   }
    // }
  console.log(skills);
    if (skills) {
      // Check if skills parameter is not empty
      if (skills.trim()) {
        // Split the input skills string into an array of normalized skills
        const skillsArray = skills
          .split(",")
          .map((skill) => skill.trim().toLowerCase());

          console.log(skillsArray);
    
        // Filter the users based on the skills
        users = users.filter((user) => {
          // Get the 0-indexed skills from the user and split into an array
          const userSkillsArray = user.skills[0]
            .split(",")
            .map((s) => s.trim().toLowerCase());
    
          // Check if every skill in the input exists in the user's skills
          return skillsArray.every((skill) => userSkillsArray.includes(skill));
        });
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
