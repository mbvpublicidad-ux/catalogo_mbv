import { Link } from "react-router-dom";

import Icon from "../common/Icon";
import Button from "../common/Button";

const VehicleCard = ({ vehicle }) => {
	const {
		id,
		images,
		brand,
		model,
		year,
		currency,
		price,
		transmission,
		fuel,
		color,
		mileage,
	} = vehicle;

	const formattedPrice = new Intl.NumberFormat(
		`${currency === "CRC" ? "es-CR" : "en-US"}`,
		{
			style: "currency",
			currency: currency || "USD",
		}
	).format(price);

	const formattedMileage = mileage
		? `${new Intl.NumberFormat("en-US").format(mileage)} millas`
		: mileage === 0
		? "0 millas"
		: "";

	const iconSize = "4";

	return (
		<div className="border-x-2 border-third text-third rounded-2xl overflow-hidden transition-all duration-300 hover:border-first hover:text-first hover:-translate-y-1 group animate-slide-up">
			{/* Imagen */}
			<div className="relative overflow-hidden">
				<img
					src={
						images && images.length > 0 ? images[0] : "/placeholder-image.jpg"
					}
					alt={`${brand.name} ${model.name} ${year}`}
					className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
				/>
			</div>

			{/* Detalles */}
			<div className="p-5">
				{/* Marca, Modelo y Año */}
				<h3 className="text-xl font-bold mb-2">
					{brand.name} {model.name} {year}
				</h3>

				{/* Color y Transmision */}
				{color && (
					<div className="flex items-center gap-3 mb-3">
						<div className="flex items-center text-sm gap-1">
							<span>
								<Icon name={"color"} size={iconSize} />
							</span>
							<span>{color || "Color N/A"}</span>
						</div>
						<div className="flex items-center text-sm gap-1">
							<span>
								<Icon name={"transmission"} size={iconSize} />
							</span>
							<span>{transmission}</span>
						</div>
					</div>
				)}

				{/* Especificaciones */}
				<div className="space-y-1.5 mb-4">
					{fuel && (
						<div className="flex items-center text-sm gap-1">
							<span>
								<Icon name={"fuel"} size={iconSize} />
							</span>
							<span>{fuel || "N/A"}</span>
						</div>
					)}
					{(mileage || mileage === 0) && (
						<div className="flex items-center text-sm gap-1">
							<span>
								<Icon name={"mileage"} size={iconSize} />
							</span>
							<span>{formattedMileage}</span>
						</div>
					)}
				</div>

				{/* Precio y Botón */}
				<div className="flex items-center justify-between">
					<div>
						<p className="text-2xl font-bold">{formattedPrice}</p>
					</div>

					<Button link={`/vehicle/${id}`} variation={"link"} text={"DETALLES"} />
				</div>
			</div>
		</div>
	);
};

export default VehicleCard;
