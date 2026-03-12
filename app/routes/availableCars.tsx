import { IoSearchSharp } from "react-icons/io5";
import { CiGrid41 } from "react-icons/ci";
import { CiCircleList } from "react-icons/ci";
import { useEffect, useState } from "react";
import api from "~/services/api";
import { getErrorMessage } from "~/utils/getErrorMessage";
import LoadingSpinnerSm from "~/components/LoadingSpinnerSm";
import CarCard from "~/components/CarCard";
import type { Car } from "~/utils/types";

export function meta() {
  return [{ title: "Available Cars" }];
}

export default function AvailableCars() {
  const [gridMode, setGridMode] = useState(true);
  const [carCount, setCarCount] = useState(0);
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;
  const numberOfPages = Math.ceil(carCount / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((x) => x + 1);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setIsLoading(true);

        const res = await api.get("/cars", {
          params: {
            carModel: debouncedSearch,
            sort: sortValue,
            page: currentPage,
            limit: itemsPerPage,
          },
        });

        setCars(res.data.data.data);
        setCarCount(res.data.total);
      } catch (error) {
        const message = getErrorMessage(error);
        console.error(message, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, [currentPage, debouncedSearch, sortValue]);

  // Debounced Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchValue);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const handleGridMode = () => {
    setGridMode((prev) => !prev);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortValue(e.target.value);
  };

  return (
    <>
      <section className="section section-gap">
        <div className="row">
          <div className="column">
            <h6 className="sub-heading text-accent-color -mb-3">Browse</h6>
            <h2 className="heading">
              Available <br></br> Cars
            </h2>
          </div>
        </div>

        {/* Filters */}
        <div className="row gap-4 p-2.5">
          <div className="relative">
            <input
              type="text"
              id="search"
              name="search"
              className="input-field pl-10 w-200 max-w-full md:max-w-100"
              placeholder="Search by car model..."
              onChange={handleSearch}
            />
            <IoSearchSharp className="absolute top-[50%] translate-y-[-50%] left-3.5 text-[18px] text-text-color" />
          </div>
          <select
            className="input-field w-full max-w-full md:max-w-60"
            id="sort"
            name="sort"
            onChange={handleSort}
          >
            <option value="">Sort By: Default</option>
            <option value="dateAdded">Date: Newest First</option>
            <option value="-dateAdded">Date: Oldest First</option>
            <option value="dailyRentalPrice">Price: Low to High</option>
            <option value="-dailyRentalPrice">Price: High to Low</option>
          </select>
          <div className="hidden md:flex ml-auto gap-2">
            <span
              className={`h-11 w-11 flex justify-center items-center rounded border border-border-color cursor-pointer text-2xl ${gridMode ? "bg-accent-color text-black border-accent-color" : "bg-bg-color"}`}
              onClick={handleGridMode}
            >
              <CiGrid41 className="" />
            </span>
            <span
              className={`h-11 w-11 flex justify-center items-center rounded border border-border-color cursor-pointer text-2xl ${gridMode ? "bg-bg-color" : "bg-accent-color text-black border-accent-color"}`}
              onClick={handleGridMode}
            >
              <CiCircleList />
            </span>
          </div>
        </div>

        {/* Car Cards */}
        <div className="row min-h-50 md:mt-5 p-2.5">
          {isLoading ? (
            <div className="mx-auto flex justify-center items-center">
              <LoadingSpinnerSm />
            </div>
          ) : (
            <div
              className={`w-full grid gap-5 ${gridMode ? "grid-col-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
            >
              {cars.map((car) => (
                <CarCard key={car._id} car={car} gridMode={gridMode}></CarCard>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {numberOfPages > 1 && (
          <div className={`pagination flex gap-2 mt-5`}>
            {pages.map((page) => (
              <button
                key={page}
                className={`${currentPage === page ? "bg-accent-color text-text-black border-accent-color" : "bg-bg-color text-text-color border-border-color"} w-8 h-8 rounded flex justify-center items-center text-center border`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
