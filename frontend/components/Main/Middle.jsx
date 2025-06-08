import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Middle() {
  const posts = [
    {
      id: 1,
      name: "Ashwin Chhipa",
      time: "1h ago",
      content:
        "Just finished building the hero section of LinkedIn clone using React and Tailwind CSS! Loving the process 💻🔥",
    },
    {
      id: 2,
      name: "Sabhyata Sethi",
      time: "2h ago",
      content:
        "Excited to start my journey into frontend development. First stop: Tailwind and React! 💡",
    },
    {
      id: 3,
      name: "Harshit Suthar",
      time: "3h ago",
      content:
        "Working with Harshit on an amazing LinkedIn clone project. Watch out for our updates 🚀",
    },
    {
      id: 4,
      name: "Sakshi Jain",
      time: "5h ago",
      content: "Designing clean UI using Tailwind CSS is oddly satisfying 🎨🧠",
    },
    {
      id: 5,
      name: "Aayush Patel",
      time: "6h ago",
      content:
        "React hooks and state management — finally getting the hang of it. 📘",
    },
    {
      id: 6,
      name: "Kavya Sharma",
      time: "8h ago",
      content:
        "Dark mode designs just hit different. Currently tweaking hover effects in Tailwind. 🌚",
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full max-w-[555px] h-auto sm:h-[116px] bg-linkedin-bg rounded-lg relative left-48 top-5 border border-linkedin-border">
        <div className="w-full max-w-[523px] h-auto sm:h-[48px] relative top-3 ml-4 flex flex-row gap-2">
          <img
            src="./src/assets/Profile.png"
            className="w-12 h-12 border rounded-[50%]"
            alt="Profile"
          />
          <input
            className="w-full max-w-[467px] h-auto sm:h-[52px] rounded-full bg-linkedin-bg border border-gray-500 pl-4 text-white placeholder:text-sm placeholder:font-bold placeholder:text-linkedin-secondary-text"
            placeholder="Start a post"
          />
        </div>
        <div className="w-full max-w-[555px] h-auto sm:h-[30px] flex flex-row justify-around relative top-6 text-gray-400 font-bold text-base">
          <div className="flex flex-row justify-center items-center gap-2 p-5 rounded-md hover:bg-linkedin-border transition-colors duration-200 cursor-pointer">
            <FontAwesomeIcon
              icon="fa-solid fa-file-video"
              className="text-green-400 size-5"
            />
            <span>Video</span>
          </div>
          <div className="flex flex-row justify-center items-center gap-2 p-4 py-5 rounded-md hover:bg-linkedin-border transition-colors duration-200 cursor-pointer">
            <FontAwesomeIcon
              icon="fa-solid fa-image"
              className="text-blue-500 size-5"
            />
            <span>Photo</span>
          </div>
          <div className="flex flex-row justify-center items-center gap-2 p-4 py-5 rounded-md hover:bg-linkedin-border transition-colors duration-200 cursor-pointer">
            <FontAwesomeIcon
              icon="fa-solid fa-file-lines"
              className="text-red-400 size-5"
            />
            <span>Write article</span>
          </div>
        </div>
      </div>

      {posts.map((post) => (
        <div
          key={post.id}
          className="w-[555px] h-auto bg-linkedin-bg rounded-lg relative left-48 top-5 border border-linkedin-border p-4"
        >
          <div className="flex items-center gap-3">
            <img
              src="./src/assets/Profile.png"
              alt="user"
              className="w-12 h-12 rounded-full border"
            />
            <div className="flex flex-col text-white">
              <span className="font-bold">{post.name}</span>
              <span className="text-sm text-linkedin-secondary-text">
                Frontend Developer • {post.time}
              </span>
            </div>
          </div>
          <div className="mt-4 text-white">{post.content}</div>
          <div className="mt-3 bg-linkedin-card h-[300px] rounded-lg"></div>
          <div className="flex justify-around text-linkedin-secondary-text text-sm mt-4">
            <span className="hover:text-white cursor-pointer flex items-center gap-1">
              <FontAwesomeIcon icon="fa-regular fa-thumbs-up" /> Like
            </span>
            <span className="hover:text-white cursor-pointer flex items-center gap-1">
              <FontAwesomeIcon icon="fa-regular fa-comment" /> Comment
            </span>
            <span className="hover:text-white cursor-pointer flex items-center gap-1">
              <FontAwesomeIcon icon="fa-solid fa-share" /> Share
            </span>
            <span className="hover:text-white cursor-pointer flex items-center gap-1">
              <FontAwesomeIcon icon="fa-solid fa-paper-plane" /> Send
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
