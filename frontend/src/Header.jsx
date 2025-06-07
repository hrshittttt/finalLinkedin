import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  return (
    <>
      <nav className="flex flex-row justify-between bg-linkedin-bg text-linkedin-secondary-text p-2 border-b border-linkedin-border">
        <div className="flex flex-row items-center gap-5 hover:text-white">
          {/* Icon and Search Bar */}
          <img src="./src/assets/LinkedIn Logo.png" className="size-10"></img>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-linkedin-secondary-text">
              <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
            </span>
            <input
              type="text"
              placeholder="Search"
              className="bg-linkedin-card text-white placeholder-linkedin-secondary-text pl-10 pr-3 py-1 rounded-md outline-none focus:ring-2 focus:ring-linkedin-blue"
            />
          </div>
        </div>
        <div className="flex flex-row gap-10 justify-center items-center">
          <a href="#" className="flex flex-col hover:text-white">
            <FontAwesomeIcon icon="fa-solid fa-house" />
            <span>Home</span>
          </a>
          <a href="#" className="flex flex-col hover:text-white">
            <FontAwesomeIcon icon="fa-solid fa-people-group" />
            <span>Network</span>
          </a>
          <a href="#" className="flex flex-col hover:text-white">
            <FontAwesomeIcon icon="fa-solid fa-briefcase" />
            <span>Jobs</span>
          </a>
          <a href="#" className="flex flex-col hover:text-white">
            <FontAwesomeIcon icon="fa-solid fa-message" />
            <span>Messaging</span>
          </a>
          <a href="#" className="flex flex-col hover:text-white">
            <FontAwesomeIcon icon="fa-solid fa-bell" />
            <span>Notifications</span>
          </a>
          <a href="#" className="flex flex-col pr-5 hover:text-white">
            <FontAwesomeIcon icon="fa-solid fa-circle-user" />
            <span>Me</span>
          </a>
        </div>
      </nav>
    </>
  );
}
