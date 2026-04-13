import User from "../models/User.js";

const createAdmin = async () => {
	try {
		const userCount = await User.countDocuments();

		if (userCount > 0) {
			console.log("Admin already exists, skipping admin creation");
			return;
		}

		await User.create({
			username: "admin",
			password: process.env.ADMIN_PASSWORD,
		});

		console.log("Admin successfully created");
	} catch (error) {
		console.error("Error creating admin user:", error.message);
	}
};

export default createAdmin;
