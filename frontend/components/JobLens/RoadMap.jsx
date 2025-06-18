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
import { FaSpinner } from "react-icons/fa";

// ✅ Icon map using react-icons components
const iconMap = {
  html: FaHtml5,
  css: FaCss3Alt,
  javascript: FaJs,
  react: FaReact,
  redux: SiRedux,
  typescript: SiTypescript,
  tailwind: SiTailwindcss,
  node: FaNodeJs,
  mongodb: SiMongodb,
  next: SiNextdotjs,
};

export default function Roadmap() {
  const [roadmapItems, setRoadmapItems] = useState([]);
  const [active, setActive] = useState(null);
  const [lastActive, setLastActive] = useState(null);
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
        setFadeOut(true);

        let raw = res.data.roadmap;
        if (raw.startsWith("```json")) {
          raw = raw
            .replace(/^```json/, "")
            .replace(/```$/, "")
            .trim();
        }

        const roadmapArray = JSON.parse(raw);
        setRoadmapItems(roadmapArray);
      } catch (err) {
        console.error("Error fetching roadmap:", err.message);
      }
    };

    fetchRoadmap();
  }, [uid]);

  const curveHeight = roadmapItems.length * 180 + 100;
  const curvePath = Array.from({ length: roadmapItems.length }, (_, i) => {
    const y = (i + 1) * 200;
    const cx = i % 2 === 0 ? 100 : 200;
    return `Q${cx} ${y - 100}, 150 ${y}`;
  }).join(" ");
  const fullPath = `M150 0 ${curvePath}`;

  return (
    <>
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            className="relative flex flex-col gap-4 items-center justify-center h-screen w-screen bg-linkedin-card text-white overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: fadeOut ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="absolute w-80 h-80 bg-blue-500 opacity-30 blur-[100px] rounded-full z-0" />
            <FaSpinner className="animate-spin text-4xl text-white z-10" />
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
            className="flex flex-col md:flex-row w-full p-6 bg-linkedin-card h-screen overflow-y-auto scrollbar-hide"
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

            {/* Left Curve/Icons Panel */}
            <div className="relative md:w-3/5 flex items-start justify-center pt-10">
              <svg
                viewBox={`0 0 300 ${curveHeight}`}
                className="absolute"
                style={{ height: curveHeight, overflow: "visible" }}
              >
                <path
                  d={fullPath}
                  stroke="#60A5FA"
                  strokeWidth="4"
                  fill="none"
                />
                <text x="140" y={curveHeight - 10} fill="#60A5FA" fontSize="24">
                  ▶
                </text>
              </svg>

              <div
                className="absolute top-0 left-36 w-full"
                style={{ height: curveHeight }}
              >
                {roadmapItems.map((item, index) => {
                  const isLeft = index % 2 !== 0;
                  const xOffset = 120;
                  const isActive = active === null || active === item.id;
                  const IconComponent =
                    iconMap[item.iconKey?.toLowerCase()] || FaJs;

                  return (
                    <motion.div
                      key={item.id}
                      onMouseEnter={() => {
                        setActive(item.id);
                        setLastActive(item.id);
                      }}
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
                        <IconComponent className="text-3xl" />
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

            {/* Sticky and vertically centered Right Side Box */}
            <div className="md:w-2/5 h-[80vh] sticky top-[10vh] self-center bg-linkedin-bg rounded-2xl shadow-inner overflow-y-auto p-6">
              {lastActive ? (
                <motion.div
                  key={lastActive}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 text-white"
                >
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    {(() => {
                      const Icon =
                        iconMap[
                          roadmapItems
                            .find((item) => item.id === lastActive)
                            ?.iconKey?.toLowerCase()
                        ] || FaJs;
                      return <Icon className="text-3xl" />;
                    })()}
                    {roadmapItems.find((item) => item.id === lastActive)?.title}{" "}
                    Guide
                  </h2>
                  <p className="text-gray-300">
                    {
                      roadmapItems.find((item) => item.id === lastActive)
                        ?.details
                    }
                  </p>

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <FaLightbulb className="text-yellow-300" />
                      What to Focus On
                    </h3>
                    <ul className="list-disc list-inside text-sm text-gray-300">
                      {roadmapItems
                        .find((item) => item.id === lastActive)
                        ?.focus?.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <FaBook className="text-blue-300" />
                      Resources
                    </h3>
                    <ul className="list-disc list-inside text-sm text-gray-300">
                      {roadmapItems
                        .find((item) => item.id === lastActive)
                        ?.resources?.map((resource, i) => (
                          <li key={i}>{resource}</li>
                        ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <FaRocket className="text-pink-400" />
                      Next Steps
                    </h3>
                    <ul className="list-disc list-inside text-sm text-gray-300">
                      {roadmapItems
                        .find((item) => item.id === lastActive)
                        ?.nextSteps?.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
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
