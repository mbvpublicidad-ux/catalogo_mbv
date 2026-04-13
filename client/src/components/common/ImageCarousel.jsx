import ChangerButton from "./ChangerButton";

import { useState } from "react";

const ImageCarousel = ({ images = [], alt = "Vehicle image" }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isZoomed, setIsZoomed] = useState(false);
	const [fade, setFade] = useState(false);

	if (!images || images.length === 0) {
		return (
			<div className="w-full h-80 rounded-lg flex items-center justify-center">
				<div className="text-center text-first">
					{/* <Icon
						path="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
						classes="h-16 w-16 mx-auto mb-2"
					/> */}
					<p>Sin imágenes disponibles</p>
				</div>
			</div>
		);
	}

	const handleImageChange = (index) => {
		setFade(true);
		setTimeout(() => {
			setCurrentIndex(index);
			setFade(false);
		}, 200);
	};

	const nextImage = () => {
		handleImageChange(
			currentIndex === images.length - 1 ? 0 : currentIndex + 1
		);
	};

	const prevImage = () => {
		handleImageChange(
			currentIndex === 0 ? images.length - 1 : currentIndex - 1
		);
	};

	const goToImage = (index) => {
		handleImageChange(index);
	};

	const toggleZoom = () => {
		setIsZoomed(!isZoomed);
	};

	return (
		<div className="relative w-full">
			{/* Main Image Display */}
			<div
				className={`relative w-full overflow-hidden rounded-lg shadow-lg ${
					isZoomed
						? "cursor-zoom-out scale-115 md:scale-150"
						: "cursor-zoom-in scale-100"
				} transition-transform duration-300`}
			>
				<img
					src={images[currentIndex]}
					alt={`${alt} ${currentIndex + 1}`}
					onClick={toggleZoom}
					className={`w-full h-full object-contain ${
						fade ? "opacity-0" : "opacity-100"
					} transition-opacity duration-300`}
				/>

				{/* Navigation Arrows */}
				{images.length > 1 && (
					<>
						<ChangerButton
							position="left-2"
							toImage={prevImage}
							icon={"<"}
						/>

						<ChangerButton
							position="right-2"
							toImage={nextImage}
							icon={">"}
						/>
					</>
				)}

				{/* Image Counter */}
				{images.length > 1 && (
					<div className="absolute top-4 right-4 bg-main/50 text-first px-3 py-1 rounded-full text-sm">
						{currentIndex + 1} / {images.length}
					</div>
				)}
			</div>

			{/* Thumbnail Navigation */}
			{images.length > 1 && (
				<div className="flex justify-center mt-4 space-x-2 overflow-x-auto pb-2">
					{images.map((image, index) => (
						<button
							key={index}
							onClick={() => goToImage(index)}
							className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
								index === currentIndex
									? "border-first"
									: "border-third hover:border-first"
							}`}
						>
							<img
								src={image}
								alt={`Thumbnail ${index + 1}`}
								className="w-full h-full object-cover"
							/>
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default ImageCarousel;
