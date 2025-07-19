import { FunctionComponent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="sticky top-0 z-50">
      <nav className="bg-[#F4F7F5] border-b border-[#2F2504]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between w-full">
            <div className="flex items-center">
              <img
                className="h-10 w-auto"
                src="/imgs/icon.jpg"
                alt="Family Tasks"
              />
              <span className="ml-2 text-xl font-bold text-[#372248]">
                MyFamily
              </span>
            </div>

            <div className="hidden sm:flex space-x-6 items-center">
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/"
                    className="text-[#5B85AA] hover:underline font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/joinToExist"
                    className="text-[#5B85AA] hover:underline font-medium"
                  >
                    Join Exist Account
                  </Link>
                  <Link
                    to="/about"
                    className="text-[#5B85AA] hover:underline font-medium"
                  >
                    About
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/famTasks")}
                    className="bg-[#5B85AA] text-white px-4 py-1.5 rounded-md
                      hover:bg-[#4a6d8a] transition duration-150 font-medium"
                  >
                    <img
                      src="/imgs/tasks.png"
                      alt="Tasks"
                      className="w-5 h-5 inline mr-2"
                    />
                    All Group Tasks
                  </button>
                  <Link
                    to="/about"
                    className="text-[#5B85AA] hover:underline font-medium"
                  >
                    About
                  </Link>
                  <Link
                    to="/home"
                    className="text-[#5B85AA] hover:underline font-medium"
                  >
                    Home
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-[#5B85AA] text-white px-4 py-1.5 rounded-md
                      hover:bg-[#4a6d8a] transition duration-150 font-medium"
                  >
                    Logout
                    <img
                      src="/imgs/logout.png"
                      alt="Logout"
                      className="w-5 h-5 inline ml-1"
                    />
                  </button>
                </>
              )}
            </div>

            <div className="sm:hidden ml-auto">
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex items-center justify-center rounded-md
                  p-2 text-[#372248] hover:bg-[#e3e6e5] focus:outline-none"
                aria-expanded={menuOpen}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {menuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="sm:hidden pb-4 ml-auto">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/"
                  className="block text-[#5B85AA] py-2 font-medium hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/joinToExist"
                  className="block text-[#5B85AA] py-2 font-medium hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  Join Exist Account
                </Link>
                <Link
                  to="/about"
                  className="block text-[#5B85AA] py-2 font-medium hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  About
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/famTasks");
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left text-[#5B85AA]
                    py-2 font-medium hover:underline"
                >
                  <img
                    src="/imgs/tasks.png"
                    alt="Tasks"
                    className="w-5 h-5 inline mr-1"
                  />
                  All Group Tasks
                </button>
                <Link
                  to="/about"
                  className="block w-full text-left text-[#5B85AA]
                    py-2 font-medium hover:underline"
                >
                  About
                </Link>
                <Link
                  to="/home"
                  className="block w-full text-left text-[#5B85AA]
                    py-2 font-medium hover:underline"
                >
                  Home
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left text-[#5B85AA]
                    py-2 font-medium hover:underline"
                >
                  Logout
                  <img
                    src="/imgs/logout.png"
                    alt="Logout"
                    className="w-5 h-5 inline ml-1"
                  />
                </button>
              </>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
