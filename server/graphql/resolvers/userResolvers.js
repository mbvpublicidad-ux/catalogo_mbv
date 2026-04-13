import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

const userResolvers = {
	Mutation: {
		login: async (_, { username, password }) => {
			const user = await User.findOne({ username });
			if (!user) throw new Error("Invalid username");

			const isPasswordValid = await bcrypt.compare(password, user.password);
			if (!isPasswordValid) throw new Error("Invalid password");

			const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
				expiresIn: "1h",
			});

			const isDefaultAdmin = username === "admin";

			return {
				token,
				user,
				isDefaultAdmin,
			};
		},
		updateCredentials: async (
			_,
			{ newUsername, currentPassword, newPassword },
			{ user }
		) => {
			if (!user) throw new Error("Authentication required");

			const userFound = await User.findById(user.id);
			const isPasswordValid = await bcrypt.compare(
				currentPassword,
				userFound.password
			);

			if (!isPasswordValid) throw new Error("Invalid current password");

			if (!newUsername === "admin") {
				throw new Error("Username must be different than admin");
			}

			if (!newUsername || newUsername.length < 2) {
				throw new Error("Username must be at least 2 characters long");
			}

			if (!newPassword || newPassword.length < 7) {
				throw new Error("Password must be at least 7 characters long");
			}

			userFound.username = newUsername;
			userFound.password = newPassword;

			await userFound.save();

			return userFound;
		},
	},
};

export default userResolvers;
