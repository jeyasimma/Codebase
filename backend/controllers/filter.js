import UserModal from "../models/user.js";

// Filter users based on year, dept, skills, and status
const filterUsers = async (req, res) => {
    try {
        const { year, dept, skills, status } = req.query;

        // Building the query object based on provided filters
        const query = {};
        if (year) query.year = year;
        if (dept) query.dept = dept;
        if (status) query.status = status;
        if (skills) query.skills = { $all: skills.split(',') };

        // Fetching users from the database
        const users = await UserModal.find(query);

        if (users.length === 0) {
            return res.status(404).json({ success: false, message: "No matching users found" });
        }

        res.status(200).json({ success: true, users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export { filterUsers };
