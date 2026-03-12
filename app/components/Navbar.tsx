import { useState } from "react";
import { NavLink } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "~/hooks/useAuth";
import api from "~/services/api";
import { getErrorMessage } from "~/utils/getErrorMessage";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";

const Navbar = () => {
  const { user, userSignOut } = useAuth();
  const [menuToggle, setMenuToggle] = useState(false);

  // console.log(user);

  const handleMenuToggle = () => {
    setMenuToggle((prev) => !prev);
  };

  const handleSignOut = async () => {
    try {
      await api.post("/auth/logout");

      await userSignOut();

      toast.info("Logout Successfull");
    } catch (error) {
      const message = getErrorMessage(error);
      console.error(message, error);
      toast.error(message);
    }
  };

  const navStyle = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-accent-color border-b border-accent-color pb-1"
      : "hover:text-accent-color transition-colors pb-1";

  const navbar = (
    <>
      <li className="menu-item">
        <NavLink to="/" className={navStyle}>
          Home
        </NavLink>
      </li>
      <li className="menu-item">
        <NavLink to="/available-cars" className={navStyle}>
          Available Cars
        </NavLink>
      </li>
      {user ? (
        <>
          <li className="menu-item">
            <NavLink to="/add-car" className={navStyle}>
              Add Car
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/my-cars" className={navStyle}>
              My Cars
            </NavLink>
          </li>
          <li className="menu-item">
            <NavLink to="/my-bookings" className={navStyle}>
              My Bookings
            </NavLink>
          </li>
          <li className="menu-item">
            <span
              className="bg-accent-color 
          text-text-black rounded-[3px] px-3 py-1 pointer border border-accent-color hover:bg-transparent hover:text-accent-color"
              onClick={handleSignOut}
            >
              Logout
            </span>
          </li>
        </>
      ) : (
        <>
          <li className="menu-item">
            <NavLink
              to="/login"
              className="bg-accent-color 
          text-text-black rounded-[3px] px-3 py-1 pointer border border-accent-color hover:bg-transparent hover:text-accent-color"
            >
              Login
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <>
      <header className="section border-b border-border-color sticky top-0 z-50 bg-bg-body">
        <div className="row exclude align-center">
          <div className="column w-1/4">
            <NavLink to="/" className="logo font-heading self-start">
              <span className="text-accent-color text-4xl">APEX</span>
              <span className="text-white text-2xl">RENTALS</span>
            </NavLink>
          </div>
          <div className="column justify-center w-3/4">
            <nav
              className={`absolute lg:static bg-bg-color lg:bg-transparent left-0 top-15.5 w-full z-10 ${menuToggle ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"}
  lg:translate-y-0 lg:opacity-100 lg:pointer-events-auto`}
            >
              <ul className="main-menu flex flex-col lg:flex-row justify-end align-center gap-7 p-4 lg:p-0 uppercase tracking-wider text-[14px] font-medium text-text-color">
                {navbar}
              </ul>
            </nav>
            <div
              className="lg:hidden self-end text-[28px] z-50 relative w-7 h-7 cursor-pointer"
              onClick={handleMenuToggle}
            >
              <RxHamburgerMenu
                className={`absolute transition-all duration-300
    ${menuToggle ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`}
              />

              <RxCross1
                className={`absolute transition-all duration-300
    ${menuToggle ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
