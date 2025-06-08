export default function Right() {
  return (
    <div>
      <div className="w-auto sm:w-[300px] h-auto sm:h-[280px] bg-linkedin-bg rounded-lg relative left-[206px] top-[20px] border border-linkedin-border p-4">
        <h2 className="text-white text-lg font-bold mb-4">LinkedIn News</h2>
        <ul className="text-linkedin-secondary-text text-sm space-y-3">
          <li className="hover:text-white cursor-pointer transition-colors duration-200">
            India's startup scene rebounds 📈
          </li>
          <li className="hover:text-white cursor-pointer transition-colors duration-200">
            Top skills for 2025 you must learn 🎯
          </li>
          <li className="hover:text-white cursor-pointer transition-colors duration-200">
            Remote work trends in tech 💻
          </li>
          <li className="hover:text-white cursor-pointer transition-colors duration-200">
            Hiring boosts in design roles 🎨
          </li>
          <li className="hover:text-white cursor-pointer transition-colors duration-200">
            GenZ reshaping corporate culture 🧠
          </li>
        </ul>
        <button className="text-linkedin-blue mt-4 hover:underline text-sm">
          Show more
        </button>
      </div>

      <div className="w-auto sm:w-[300px] mt-5 bg-linkedin-bg rounded-lg relative left-[206px] top-2 border border-linkedin-border p-4">
        <h2 className="text-white text-lg font-bold mb-4">Add to your feed</h2>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gray-500"></div>
          <div className="flex flex-col text-white text-sm">
            <span>#ReactJS</span>
            <button className="text-linkedin-blue text-xs hover:underline">
              Follow
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-gray-500"></div>
          <div className="flex flex-col text-white text-sm">
            <span>#TailwindCSS</span>
            <button className="text-linkedin-blue text-xs hover:underline">
              Follow
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-500"></div>
          <div className="flex flex-col text-white text-sm">
            <span>#Frontend</span>
            <button className="text-linkedin-blue text-xs hover:underline">
              Follow
            </button>
          </div>
        </div>
        <button className="text-linkedin-blue mt-4 hover:underline text-sm">
          View all recommendations
        </button>
      </div>
    </div>
  );
}
