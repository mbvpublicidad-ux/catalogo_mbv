import { Outlet } from "react-router-dom";
import NavBar from "../common/NavBar";

const MainLayout = () => {
	return (
		<div className="">
			<NavBar />
			<main className="container mx-auto px-4 py-6">
				<Outlet />
			</main>
		</div>
	);
};

export default MainLayout;
