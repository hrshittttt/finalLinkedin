import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaLightbulb,
  FaBook,
  FaRocket,
  FaMapSigns,
  FaCompass,
  FaLaptopCode,
  FaHome,
} from "react-icons/fa";
import {
  SiMongodb,
  SiRedux,
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
} from "react-icons/si";

const roadmapItems = [
  {
    id: 1,
    icon: <FaHtml5 className="text-orange-500 text-3xl" />,
    title: "HTML",
    time: "1 week",
    details:
      "Learn HTML tags, structure, semantic elements, and forms. Understand accessibility and SEO basics.",
  },
  {
    id: 2,
    icon: <FaCss3Alt className="text-blue-500 text-3xl" />,
    title: "CSS",
    time: "1-2 weeks",
    details:
      "Master layout (Flexbox, Grid), styling, animations, and responsiveness.",
  },
  {
    id: 3,
    icon: <FaJs className="text-yellow-400 text-3xl" />,
    title: "JavaScript",
    time: "3-4 weeks",
    details:
      "Understand variables, functions, DOM manipulation, ES6+, fetch API, async/await.",
  },
  {
    id: 4,
    icon: <FaReact className="text-cyan-400 text-3xl" />,
    title: "React",
    time: "3-4 weeks",
    details:
      "Learn components, hooks, props, state, context API, and basic routing.",
  },
  {
    id: 5,
    icon: <SiRedux className="text-purple-500 text-3xl" />,
    title: "Redux",
    time: "1-2 weeks",
    details:
      "Understand global state management, actions, reducers, and the Redux Toolkit.",
  },
  {
    id: 6,
    icon: <SiTypescript className="text-blue-700 text-3xl" />,
    title: "TypeScript",
    time: "1-2 weeks",
    details:
      "Learn type annotations, interfaces, types vs. interfaces, generics, and integration with React.",
  },
  {
    id: 7,
    icon: <SiTailwindcss className="text-sky-400 text-3xl" />,
    title: "Tailwind CSS",
    time: "1 week",
    details:
      "Use utility-first classes for rapid UI building. Understand config and responsive design.",
  },
  {
    id: 8,
    icon: <FaNodeJs className="text-green-500 text-3xl" />,
    title: "Node.js",
    time: "2-3 weeks",
    details: "Understand Express, REST APIs, middleware, and backend routing.",
  },
  {
    id: 9,
    icon: <SiMongodb className="text-green-700 text-3xl" />,
    title: "MongoDB",
    time: "1-2 weeks",
    details:
      "Learn schemas, models, CRUD operations, and connecting to Express.",
  },
  {
    id: 10,
    icon: <SiNextdotjs className="text-white text-3xl" />,
    title: "Next.js",
    time: "2 weeks",
    details:
      "Learn file-based routing, SSR vs. CSR, API routes, and deployment strategies.",
  },
];

export default function Roadmap() {
  const [active, setActive] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1200);
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            className="relative flex items-center justify-center h-screen w-screen bg-linkedin-card text-white overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: fadeOut ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="absolute w-80 h-80 bg-blue-500 opacity-30 blur-[100px] rounded-full z-0" />
            <motion.p
              className="relative z-10 text-2xl font-semibold text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Crafting your personalized roadmap...
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            className="flex flex-col md:flex-row w-full p-6 bg-linkedin-card overflow-y-scroll h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Move the LinkedIn image here and animate it */}
            <motion.img
              src="/Linkedin.png"
              alt="LinkedIn Logo"
              className="max-w-28 max-h-7 relative left-4 top-4 cursor-pointer"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />

            <div className="relative md:w-1/2 flex items-start justify-center pt-10">
              <svg
                viewBox="0 0 300 1800"
                className="absolute h-[1800px] w-auto"
              >
                <path
                  d="M150 0 Q100 100 150 200 Q200 300 150 400 Q100 500 150 600 Q200 700 150 800 Q100 900 150 1000 Q200 1100 150 1200 Q100 1300 150 1400 Q200 1500 150 1600 Q100 1700 150 1800"
                  stroke="#60A5FA"
                  strokeWidth="4"
                  fill="none"
                />
                <text x="140" y="1815" fill="#60A5FA" fontSize="24">
                  ▶
                </text>
              </svg>

              <div className="absolute top-0 left-36 h-[1800px] w-full">
                {roadmapItems.map((item, index) => {
                  const isLeft = index % 2 !== 0;
                  const xOffset = 120;
                  const isActive = active === null || active === item.id;

                  return (
                    <motion.div
                      key={item.id}
                      onMouseEnter={() => setActive(item.id)}
                      onMouseLeave={() => setActive(null)}
                      className={`absolute -translate-y-1/2 text-center cursor-pointer transition-opacity duration-300 ${
                        active && active !== item.id
                          ? "opacity-30"
                          : "opacity-100"
                      }`}
                      style={{
                        top: `${index * 180 + 60}px`,
                        left: "150px",
                        opacity: isActive ? 1 : 0.2,
                      }}
                      initial={{ x: isLeft ? -xOffset : xOffset }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex flex-col items-center gap-1">
                        {item.icon}
                        <div className="text-white font-semibold text-sm">
                          {item.title}
                        </div>
                        <div className="text-xs text-gray-300">{item.time}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="relative md:w-1/2 p-6 sticky top-0 h-screen bg-linkedin-bg rounded-2xl shadow-inner overflow-y-auto">
              {active ? (
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 text-white"
                >
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    {roadmapItems.find((item) => item.id === active)?.icon}
                    {
                      roadmapItems.find((item) => item.id === active)?.title
                    }{" "}
                    Guide
                  </h2>
                  <p className="text-gray-300">
                    {roadmapItems.find((item) => item.id === active)?.details}
                  </p>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <FaLightbulb className="text-yellow-300" />
                      What to Focus On
                    </h3>
                    <ul className="list-disc list-inside text-sm text-gray-300">
                      <li>Conceptual clarity</li>
                      <li>Hands-on practice</li>
                      <li>Project implementation</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <FaBook className="text-blue-300" />
                      Resources
                    </h3>
                    <ul className="list-disc list-inside text-sm text-gray-300">
                      <li>Official Documentation</li>
                      <li>YouTube Crash Courses</li>
                      <li>CodeSandbox, LeetCode, Frontend Mentor</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <FaRocket className="text-pink-400" />
                      Next Steps
                    </h3>
                    <ul className="list-disc list-inside text-sm text-gray-300">
                      <li>Build mini-projects</li>
                      <li>Write notes or blog summaries</li>
                      <li>Revise and connect with peers</li>
                    </ul>
                  </div>
                </motion.div>
              ) : (
                <div className="text-gray-400 text-left space-y-4">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <FaMapSigns className="text-teal-400" /> Welcome to Your Web
                    Dev Journey!
                  </h2>
                  <p className="flex items-center gap-2">
                    <FaCompass className="text-yellow-300" /> Hover over any
                    technology on the left to explore learning guides.
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li className="flex items-center gap-2">
                      <FaLaptopCode className="text-green-400" /> Explore from
                      HTML to Next.js
                    </li>
                    <li className="flex items-center gap-2">
                      <FaBook className="text-blue-300" /> Get focused study
                      tips
                    </li>
                    <li className="flex items-center gap-2">
                      <FaRocket className="text-pink-400" /> Access resources
                      and next steps
                    </li>
                  </ul>
                </div>
              )}

              <button
                onClick={() => (window.location.href = "/")}
                className="absolute bottom-10 right-6 bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-full text-white flex items-center gap-2 shadow-md"
              >
                <FaHome />
                Home
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
