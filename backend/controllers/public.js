import UserModal from "../models/user.js"


const GetSingleuser = async (req, res) => {
    try {
        const userId = req.params.id

        const user = await UserModal.findById(userId)
            // .populate({
            //     path: "comments",
            //     populate: {
            //         path: "userId"
            //     }
            // })

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });

        }
        res.status(200).json({ success: true, user })
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

export { GetSingleuser }