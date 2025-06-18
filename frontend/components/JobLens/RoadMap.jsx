import { useEffect, useState } from "react";
import axios from "axios";
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
const iconMap = {
  html: <FaHtml5 className="text-orange-500 text-3xl" />,
  css: <FaCss3Alt className="text-blue-500 text-3xl" />,
  javascript: <FaJs className="text-yellow-400 text-3xl" />,
  react: <FaReact className="text-cyan-400 text-3xl" />,
  redux: <SiRedux className="text-purple-500 text-3xl" />,
  typescript: <SiTypescript className="text-blue-700 text-3xl" />,
  tailwind: <SiTailwindcss className="text-sky-400 text-3xl" />,
  node: <FaNodeJs className="text-green-500 text-3xl" />,
  mongodb: <SiMongodb className="text-green-700 text-3xl" />,
  next: <SiNextdotjs className="text-white text-3xl" />,
};




export default function Roadmap() {
  const [roadmapItems, setRoadmapItems] = useState([]);
  const [active, setActive] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const uid = localStorage.getItem("uid");
  

  useEffect(() => {
    const fetchRoadmap = async () => {

      try {
        const res = await axios.post("http://localhost:4000/roadmap/generate", {
          uid,
        });
        setIsLoading(false);
        setFadeOut(true)



        let raw = res.data.roadmap;

    
    if (raw.startsWith("```json")) {
      raw = raw.replace(/^```json/, "").replace(/```$/, "").trim();
    }

   
    const roadmapArray = JSON.parse(raw);
    console.log(roadmapArray)


        setRoadmapItems(roadmapArray);
      } catch (err) {
        console.error("Error fetching roadmap:", err.message);
      }
    };

    fetchRoadmap();
    // const fadeTimer = setTimeout(() => setFadeOut(true), 1200);
    // // const timer = setTimeout(() => setIsLoading(false), 1500);
    // return () => {
    //   clearTimeout(fadeTimer);
    //   clearTimeout(timer);
    // };
  }, [uid]);

  
  function parseRoadmapText(text) {
    const lines = text.split("\n").filter((line) => line.trim() !== "");
    let id = 1;
    const items = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const match = line.match(/^\d+\.\s*(.+?)\s*-\s*(.+)$/); // 1. HTML - 1 week
      if (match) {
        const title = match[1].trim();
        const time = match[2].trim();
        const details = lines[i + 1]?.trim() || "";
        const iconKey = title.toLowerCase().split(" ")[0];
        items.push({
          id: id++,
          title,
          time,
          details,
          icon: iconMap[iconKey] || <FaJs className="text-gray-400 text-3xl" />,
        });
        i++; 
      }
    }

    return items;
  }

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
            <motion.img
              src="/Linkedin.png"
              alt="LinkedIn Logo"
              className="max-w-28 max-h-7 relative left-4 top-4 cursor-pointer"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />

            <div className="relative md:w-1/2 flex items-start justify-center pt-10">
              <svg viewBox="0 0 300 1800" className="absolute h-[1800px] w-auto">
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
                        active && active !== item.id ? "opacity-30" : "opacity-100"
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
                        <div className="text-white font-semibold text-sm">{item.title}</div>
                        <div className="text-xs text-gray-300">{item.time}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="md:w-1/2 p-6 sticky h-screen bg-linkedin-bg rounded-2xl shadow-inner overflow-y-auto">
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
                    {roadmapItems.find((item) => item.id === active)?.title} Guide
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
                    <FaMapSigns className="text-teal-400" /> Welcome to Your Web Dev Journey!
                  </h2>
                  <p className="flex items-center gap-2">
                    <FaCompass className="text-yellow-300" /> Hover over any technology on the
                    left to explore learning guides.
                  </p>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li className="flex items-center gap-2">
                      <FaLaptopCode className="text-green-400" /> Explore from HTML to Next.js
                    </li>
                    <li className="flex items-center gap-2">
                      <FaBook className="text-blue-300" /> Get focused study tips
                    </li>
                    <li className="flex items-center gap-2">
                      <FaRocket className="text-pink-400" /> Access resources and next steps
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
