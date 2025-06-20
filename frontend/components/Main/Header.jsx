import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link , useNavigate } from "react-router-dom";

export default function Header() {
  return (
    <>
      <nav className="flex flex-row justify-between bg-linkedin-bg text-linkedin-secondary-text p-2 border-b border-linkedin-border max-h-14">
        <div className="flex flex-row items-center gap-1 hover:text-white ml-10 sm:ml-40">
          {/* Icon and Search Bar */}
          <Link to="/">
            <img
              src="./src/assets/LinkedinDarkShort.png"
              className="w-12 h-12"
              alt="LinkedIn Logo"
            />
          </Link>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-linkedin-secondary-text pl-1 pr-4">
              <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
            </span>
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-700 text-white placeholder-gray-400 pr-10 py-2 pl-9 rounded-md outline-none focus:ring-2 focus:ring-linkedin-blue w-40 sm:w-60 md:w-72"
            />
          </div>
        </div>
        <div className="flex flex-row gap-6 sm:gap-10 justify-center items-center">
          <Link to="/" className="flex flex-col hover:text-white">
            <FontAwesomeIcon icon="fa-solid fa-house" />
            <span>Home</span>
          </Link>
          <Link to="/" className="flex flex-col hover:text-white">
            <FontAwesomeIcon icon="fa-solid fa-people-group" />
            <span>Network</span>
          </Link>
          <Link to="/" className="flex flex-col hover:text-white">
            <FontAwesomeIcon icon="fa-solid fa-briefcase" />
            <span>Jobs</span>
          </Link>
          <Link to="/jobhome" className="flex flex-col hover:text-white">
            <FontAwesomeIcon icon="fa-solid fa-binoculars" />
            <span>JobLens</span>
          </Link>
          <Link to="/" className="flex flex-col hover:text-white">
            <FontAwesomeIcon icon="fa-solid fa-message" />
            <span>Messaging</span>
          </Link>
          <Link to="/" className="flex flex-col hover:text-white">
            <FontAwesomeIcon icon="fa-solid fa-bell" />
            <span>Notifications</span>
          </Link>
          <Link to="/" className="flex flex-col pr-3 sm:pr-5 hover:text-white">
            <FontAwesomeIcon icon="fa-solid fa-circle-user" />
            <span>Me</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
