import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleredirect = (path) => {
    if (path == "signUp") {
      navigate("/signUp");
    }
    if (path == "signIn") {
      navigate("/signIn");
    }
    if (path == "LogOut") {
      localStorage.removeItem("accessToken")
      localStorage.removeItem("userStatus")
      navigate("/signIn");
    }
    if (path == "profile") {
      navigate("/UserProfile");
    }
  };

  const accessToken = localStorage.getItem("accessToken");
 
  
  return (
    <nav className="mb-5 bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          Smart Path
        </span>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {/* login & signup  */}

          {!accessToken && (
            <>
              <button
                type="button"
                onClick={() => handleredirect("signIn")}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mr-2 px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => handleredirect("signUp")}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign Up
              </button>
            </>
          )}

          {/* profile button  */}

          {accessToken && (
            <>
              <button type="button" onClick={() => handleredirect("profile")}>
                <div className="relative mr-3 w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <svg
                    className="absolute w-12 h-12 text-gray-400 -left-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleredirect("LogOut")}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Log out
              </button>
            </>
          )}
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="/"
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
