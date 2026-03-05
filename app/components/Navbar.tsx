import { NavLink } from "react-router";

const Navbar = () => {
  const user = true;

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
            <a
              href="#"
              className="bg-accent-color 
          text-text-black rounded-[3px] px-3 py-1 pointer border border-accent-color hover:bg-transparent hover:text-accent-color"
            >
              Logout
            </a>
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
      <header className="section border-b border-border-color sticky top-0 z-50">
        <div className="row align-center">
          <div className="column w-1/4">
            <NavLink to="/" className="logo font-heading">
              <span className="text-accent-color text-4xl">APEX</span>
              <span className="text-white text-2xl">RENTALS</span>
            </NavLink>
          </div>
          <div className="column justify-center w-3/4">
            <nav>
              <ul className="main-menu flex justify-end align-center gap-7 uppercase tracking-wider text-[14px] font-medium text-text-color">
                {navbar}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
