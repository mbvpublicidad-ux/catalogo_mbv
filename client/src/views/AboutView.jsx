import React from "react";

const AboutView = () => {
	return (
		<div className="flex flex-col items-center gap-10 text-first">
			<div>
				<h1 className="font-bold text-4xl text-center">Acerca de Nosotros</h1>
			</div>
			<div className="md:w-1/2 lg:w-1/3 p-7 rounded-lg border-x-2 transition-all duration-400 hover:shadow-lg hover:scale-105">
				<p className="text-justify">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
					omnis accusantium vel repellendus expedita dolore, pariatur, tempora
					sequi cupiditate necessitatibus, aliquid aut eveniet maxime animi
					repudiandae? Blanditiis laborum nam omnis. Lorem ipsum dolor sit amet
					consectetur adipisicing elit. Aut qui ratione quibusdam voluptatem
					culpa repellendus quaerat suscipit voluptates, voluptate nisi ab
					explicabo officia architecto minima aperiam dignissimos magni eaque?
					Nihil.
				</p>
			</div>
		</div>
	);
};

export default AboutView;
