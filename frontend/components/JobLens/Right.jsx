import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserTie,
  faBuilding,
  faMap,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";


export default function Right() {
  const [active, setActive] = useState(0);

  const descriptions = [
    {
      title: "Personalized Mock Interviews",
      icon: faUserTie,
      text: "JobLens offers Personalized Mock Interviews that go beyond generic practice questions. These interviews are tailored specifically to your resume, skillset, experience level, and the roles you’re aiming for. Whether you’re a student, a fresher, or a professional aiming for a role switch, the questions you face will reflect real-world scenarios you’re likely to encounter. The system evaluates your answers and provides detailed feedback to help you improve your communication, problem-solving, and technical thinking. It’s like having a personal interview coach, helping you grow more confident and interview-ready with each attempt.",
      path: "/profileinterview",
    },
    {
      title: "Company-Specific Mock Interviews",
      icon: faBuilding,
      text: "When targeting top companies like Google, Microsoft, Amazon, or any product/startup firms, the interview process can be intimidating. That’s why we created Company-Specific Mock Interviews that simulate actual hiring patterns of these organizations. You’ll get practice questions based on real interview data, aligned with specific formats — including coding rounds, system design, HR, and behavioral questions. These mocks replicate not just the content, but the pressure and style of the real thing, so you’re well-prepared when it counts the most. It’s your shortcut to inside knowledge and higher success chances in cracking dream jobs.",
      path: "/companyinterview",
    },
    {
      title: "Job Roadmaps",
      icon: faMap,
      text: "Choosing a career path is confusing — there are too many resources, tools, and learning tracks out there. Our Job Roadmaps solve that. We offer structured, step-by-step guides tailored to different tech career goals like Frontend Developer, Backend Developer, Data Analyst, and more. Each roadmap outlines what to learn, when to learn it, what tools to master, and what projects to build — all in a well-organized, progressive format. These roadmaps are like GPS for your career — they keep you focused, eliminate guesswork, and ensure you build the right skills in the right order to land your desired job confidently.",
      path: "/roadmap",
    },
  ];

  return (
    <div className="relative top-5 px-4 md:left-40 flex flex-col gap-7">
      {/* Header Section */}
      <div className="w-full max-w-[804px] mx-auto border border-linkedin-border bg-linkedin-bg rounded-lg p-5">
        <h1 className="text-4xl text-linkedin-text font-semibold mb-1">
          JobLens
        </h1>
        <p className="text-slate-300 font-normal mb-4">
          A new way to help professionals land their dream jobs.
        </p>

        <div className="text-linkedin-text flex flex-wrap gap-3">
          {descriptions.map((item, index) => (
            <motion.button
              key={index}
              onClick={() => setActive(index)}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`flex items-center gap-2 border border-linkedin-border px-3 py-1.5 text-sm rounded-md bg-linkedin-card hover:bg-linkedin-border transition-all outline-none focus:outline-none ${
                active === index
                  ? "ring-2 ring-linkedin-blue ring-offset-1 bg-linkedin-border text-white"
                  : ""
              }`}
            >
              <FontAwesomeIcon icon={item.icon} className="text-base" />
              {item.title}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Animated Content Section */}
      <div className="w-full max-w-[804px] min-h-[280px] mx-auto border border-linkedin-border bg-linkedin-bg rounded-lg p-6 transition-all overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.h2 className="text-4xl font-semibold mb-4 text-linkedin-text flex items-center gap-3">
              <FontAwesomeIcon icon={descriptions[active].icon} />
              {descriptions[active].title}
            </motion.h2>

            <p className="text-slate-300 text-base leading-9 tracking-wide mb-5">
              {descriptions[active].text}
            </p>

            <motion.button
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-linkedin-card border border-linkedin-border text-white py-2 px-5 text-lg rounded-lg hover:bg-linkedin-border transition-all "
              
            > <Link to={descriptions[active].path}>
            <FontAwesomeIcon icon={faRocket} className="mr-3" />
              Start Now
            </Link>
              
            </motion.button>

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
