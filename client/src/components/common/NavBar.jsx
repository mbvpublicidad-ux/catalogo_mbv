import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import { useTheme } from "../../hooks/ThemeContext";

import logoNegativo from "../../assets/mbv_horizontal_negativo.svg";
import logoPositivo from "../../assets/mbv_horizontal_positivo.svg";
import ThemeChanger from "./ThemeChanger";
import NavDropDown from "./NavDropDown";
import Button from "./Button";
import Icon from "./Icon";

const NavBar = () => {
	const { theme } = useTheme();
	const { isAuthenticated, logout } = useAuth();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const closeMenu = () => setIsMenuOpen(false);

	const iconSize = "4";

	return (
		<div>
			<nav className="shadow-lg bg-first rounded-2xl mx-4 mt-4">
				<div className="px-4">
					<div className="flex items-center h-25">
						<div className="hidden lg:flex lg:justify-center lg:w-full">
							<div className="flex items-center justify-center w-full px-4">
								<Link to={"/"}>
									<img
										src={theme === "dark-theme" ? logoPositivo : logoNegativo}
										alt="mbv"
										className="h-36"
									/>
								</Link>
								<div className="flex items-center gap-2">
									<Button
										link={"/"}
										text={"Inicio"}
										color={"nav-link"}
										variation={"nav-link"}
										icon={<Icon name={"home"} size={iconSize} />}
									/>
									<NavDropDown
										title={"Marcas"}
										icon={<Icon name={"brand"} size={iconSize} />}
										type="desktop"
									/>
									<NavDropDown
										title={"Modelos"}
										icon={<Icon name={"model"} size={iconSize} />}
										type="desktop"
									/>
									{!isAuthenticated && (
										<Button
											link={"/about"}
											text={"Nosotros"}
											color={"nav-link"}
											variation={"nav-link"}
											icon={<Icon name={"about"} size={iconSize} />}
										/>
									)}
									{isAuthenticated && (
										<Button
											link={"/admin"}
											text={"Admin"}
											color={"nav-link"}
											variation={"nav-link"}
											icon={<Icon name={"admin"} size={iconSize} />}
										/>
									)}
									<ThemeChanger />
									<div className="hidden lg:block">
										{isAuthenticated && (
											<Button
												color={"red"}
												type={"button"}
												onClick={logout}
												isRoundedFull={true}
												icon={<Icon name={"logout"} size={iconSize} />}
											/>
										)}
									</div>
								</div>
							</div>
						</div>

						<div className="lg:hidden flex justify-between w-full">
							<Link to={"/"}>
								<img
									src={theme === "dark-theme" ? logoPositivo : logoNegativo}
									alt="mbv"
									className="h-14 md:h-32"
								/>
							</Link>
							<Button
								type={"button"}
								isIcon={true}
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								icon={
									isMenuOpen ? <Icon name={"close"} /> : <Icon name={"menu"} />
								}
							/>
						</div>
					</div>
				</div>

				<div
					className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
						isMenuOpen
							? "max-h-full opacity-100 translate-y-0"
							: "max-h-0 opacity-0 -translate-y-4"
					}`}
				>
					<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-b rounded-b-2xl shadow-xl">
						<ThemeChanger />
						<Button
							link={"/"}
							text={"Inicio"}
							color={"nav-link"}
							onClick={closeMenu}
							variation={"nav-link"}
							icon={<Icon name={"home"} size={iconSize} />}
						/>
						<NavDropDown
							title={"Marcas"}
							icon={<Icon name={"brand"} size={iconSize} />}
							type="mobile"
							handleFunction={closeMenu}
						/>
						<NavDropDown
							title={"Modelos"}
							icon={<Icon name={"model"} size={iconSize} />}
							type="mobile"
							handleFunction={closeMenu}
						/>
						{isAuthenticated ? (
							<Button
								link={"/admin"}
								text={"Admin"}
								color={"nav-link"}
								onClick={closeMenu}
								variation={"nav-link"}
								icon={<Icon name={"admin"} size={iconSize} />}
							/>
						) : (
							<Button
								link={"/about"}
								text={"Nosotros"}
								color={"nav-link"}
								onClick={closeMenu}
								variation={"nav-link"}
								icon={<Icon name={"about"} size={iconSize} />}
							/>
						)}
						<div className="flex justify-center mt-4">
							{isAuthenticated && (
								<Button
									color="red"
									type={"button"}
									text={"CERRAR SESION"}
									onClick={logout}
								/>
							)}
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default NavBar;
