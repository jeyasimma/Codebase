import UserModal from "../models/User.js";

export const filterUsers = async (req, res) => {
  try {
    const { year, dept, skills, status } = req.query;

    const query = {};
    if (year) query.year = year;
    if (dept) query.dept = dept;
    if (status) query.status = status;

    // console.log("helooooooooooooooo",query);
    let users = await UserModal.find(query);
    // console.log("ajsvdddddddddddddddddjsd".users);

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
    if (skills.trim()) {
      // Split the input skills string into an array of normalized skills
      let skillsArray = [];
      let userSkillsArray = [];
  
      if (skills.includes(",")) {
        skillsArray = skills
          .split(",")
          .map((skill) => skill.trim().toLowerCase());
      } else {
        skillsArray = [skills.trim().toLowerCase()];
      }
  
      // Filter the users based on the skills
      users = users.filter((user) => {
        // Check if user.skills exists and is an array
        if (!user.skills || !Array.isArray(user.skills) || !user.skills.length) {
          return false; // Skip users with no skills
        }
  
        // Check if user.skills[0] is a string and split into an array
        if (typeof user.skills[0] === "string") {
          if (user.skills[0].includes(",")) {
            userSkillsArray = user.skills[0]
              .split(",")
              .map((s) => s.trim().toLowerCase());
          } else {
            userSkillsArray = [user.skills[0].trim().toLowerCase()];
          }
        } else {
          return false; // Skip users if skills[0] is not a string
        }
  
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
