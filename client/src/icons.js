import { TbBrandAsana } from "react-icons/tb";
import { HiColorSwatch } from "react-icons/hi";
import { BsFuelPumpFill } from "react-icons/bs";
import { GrPrevious, GrNext } from "react-icons/gr";
import { GiTransportationRings } from "react-icons/gi";
import { IoLogoModelS, IoIosPeople } from "react-icons/io";
import { AiOutlineMenu, AiOutlineClose, AiFillHome } from "react-icons/ai";
import {
	BiLogOut,
	BiSkipPrevious,
	BiSkipNext,
	BiSearch,
	BiImages,
} from "react-icons/bi";
import {
	RiAdminFill,
	RiPinDistanceFill,
	RiArrowDownFill,
	RiArrowUpFill,
	RiFilterFill,
} from "react-icons/ri";

export const IconMap = {
	home: AiFillHome,
	model: IoLogoModelS,
	about: IoIosPeople,
	admin: RiAdminFill,
	brand: TbBrandAsana,
	menu: AiOutlineMenu,
	close: AiOutlineClose,
	logout: BiLogOut,
	color: HiColorSwatch,
	transmission: GiTransportationRings,
	fuel: BsFuelPumpFill,
	mileage: RiPinDistanceFill,
	arrowDown: RiArrowDownFill,
	arrowUp: RiArrowUpFill,
	filter: RiFilterFill,
	prev: BiSkipPrevious,
	next: BiSkipNext,
	prevThin: GrPrevious,
	nextThin: GrNext,
	search: BiSearch,
	images: BiImages,
};
