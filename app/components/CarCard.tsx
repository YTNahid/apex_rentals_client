import { FaBookmark, FaMapPin } from "react-icons/fa";
import { NavLink } from "react-router";
import type { Car } from "~/utils/types";

type CarProps = {
  car: Car;
  gridMode: boolean;
};

export default function CarCard({ car, gridMode = true }: CarProps) {
  return (
    <NavLink
      to={`/car-details/:${car._id}`}
      className={`flex flex-col relative bg-bg-color rounded border border-border-color overflow-hidden hover:border-accent-color
        ${gridMode ? "" : "md:flex-row"}`}
    >
      {/* badge */}
      <span
        className={`uppercase text-[12px] font-semibold border rounded-full px-2 py-0.5 absolute top-3 left-3 text-white
         ${car.availability ? "bg-green-700  border-green-300" : "bg-red-700 border-red-300"}`}
      >
        {car.availability ? "Available" : "Unavailable"}
      </span>
      <span className="bg-bg-color absolute right-3 top-3 rounded border border-border-color px-2 py-0.5">
        <span className="text-accent-color font-heading">
          <span className="text-xl">৳</span>
          {car.dailyRentalPrice}
        </span>
        <span className="text-text-color text-[12px]">/day</span>
      </span>

      {/* Image */}
      <img
        src={car.imageUrl}
        alt={car.carModel}
        className={` object-cover w-full h-50 ${gridMode ? "" : "md:w-1/4 md:h-45 lg:h-50"}`}
      />

      {/* Body */}
      <div className={`p-4 flex flex-col h-full ${gridMode ? "" : "w-3/4"}`}>
        <h4 className="heading font-medium">{car.carModel}</h4>
        <div className="flex mt-3 text-text-color gap-6">
          <span className="flex align-center gap-1">
            <FaMapPin className="text-accent-color" />
            <span className="-mt-0.5 text-[14px]">{car.location}</span>
          </span>
          <span className="flex align-center gap-1">
            <FaBookmark className="text-accent-color" />
            <span className="-mt-0.5 text-[14px]">{car.bookingCount} Bookings</span>
          </span>
        </div>
        <div className="flex flex-wrap my-4 text-text-color gap-2">
          {car.features.split(",").map((feature, idx) => (
            <span
              key={idx}
              className="flex align-center gap-1 text-[14px] bg-[#1A1A24] px-2 border border-border-color rounded-[3px]"
            >
              {feature}
            </span>
          ))}
        </div>
        <button className={`btn-primary mt-auto ${gridMode ? "w-full" : "self-start"}`}>
          Book Now
        </button>
      </div>
    </NavLink>
  );
}
