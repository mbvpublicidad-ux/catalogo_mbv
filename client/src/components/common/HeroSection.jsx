import logo_vertical_negativo from "../../assets/mbv_vertical_negativo.svg";
import logo_vertical_positivo from "../../assets/mbv_vertical_positivo.svg";
import heroImg from "../../assets/hero.png";
import Button from "./Button";
import Anchor from "./Anchor";

import { useTheme } from "../../hooks/ThemeContext";

const HeroSection = () => {
	const wsLink = "https://wa.me/50684843484";

	const { theme } = useTheme();

	return (
		<section className="rounded-2xl border-x-2 border-first mb-15">
			<div className="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
				<div className="flex flex-col items-center mr-auto place-self-center lg:col-span-7">
					<h1 className="mb-4 max-w-2xl md:w-xl lg:w-2xl text-center lg:text-start text-3xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl text-first">
						Bienvenido a Importaciones MBV
					</h1>
					<p className="mb-6 max-w-2xl text-justify text-sm md:text-lg lg:mb-8 lg:text-xl text-third">
						Importamos tu auto soñado desde Estados Unidos hasta Costa Rica,
						ofreciéndote un servicio completo de principio a fin. Realizamos una
						inspección técnica y estética de cada auto, para brindarte la mejor
						información y que tengas toda la seguridad que necesitas al elegir
						tu auto.
					</p>
					<div className="flex gap-4">
						<Button
							link={wsLink}
							text={"CONTACTAR"}
							color="default"
							variation={"anchor"}
						/>
						<Button
							variation={"link"}
							link={"/about"}
							text={"SABER MÁS"}
							color={"third"}
						/>
					</div>
				</div>
				<div className="hidden lg:col-span-5 lg:mt-0 lg:flex">
					<div className="reelative group text-first text-center rounded-2xl p-5 transition-all duration-200 hover:scale-110 hover:border-x-2">
						<div className="relative flex justify-center">
							<img
								src={
									theme === "dark-theme"
										? logo_vertical_negativo
										: logo_vertical_positivo
								}
								alt="mbv"
								className="h-40 absolute"
							/>
						</div>
						<img src={heroImg} alt="mockup" />
						<p className="absolute bottom-10 left-1/3 hidden group-hover:block animate-slide-in">
							Seguridad, Confort y Precio
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default HeroSection;
