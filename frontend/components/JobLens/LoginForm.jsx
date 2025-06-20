import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

import { useNavigate } from "react-router-dom";

export default function LinkedInForm() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [experiences, setExperiences] = useState("");
  const [education, setEducation] = useState("");
  const [targetCompany, setTargetCompany] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [resume, setResume] = useState(null);
  const [gitUrl, setGitURL] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchRole, setSearchRole] = useState("");
  const [showRoleSuggestions, setShowRoleSuggestions] = useState(false);
  const [errors, setErrors] = useState({});
  const skillWrapperRef = useRef(null);
  const roleWrapperRef = useRef(null);

  const skills = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C",
    "C++",
    "C#",
    "Go",
    "Rust",
    "Kotlin",
    "Swift",
    "PHP",
    "Ruby",
    "R",
    "Scala",
    "Perl",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "Sass",
    "LESS",
    "Bootstrap",
    "React",
    "Next.js",
    "Vue.js",
    "Nuxt.js",
    "Angular",
    "jQuery",
    "WebAssembly",
    "Three.js",
    "D3.js",
    "Vite",
    "Webpack",
    "Node.js",
    "Express.js",
    "NestJS",
    "Hapi.js",
    "Django",
    "Flask",
    "FastAPI",
    "Spring Boot",
    "Ruby on Rails",
    "ASP.NET",
    "Laravel",
    "React Native",
    "Flutter",
    "SwiftUI",
    "Jetpack Compose",
    "Ionic",
    "Xamarin",
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "SQLite",
    "Oracle DB",
    "MariaDB",
    "Firebase",
    "Supabase",
    "Redis",
    "AWS",
    "Azure",
    "Google Cloud",
    "DigitalOcean",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Jenkins",
    "Terraform",
    "Ansible",
    "Git",
    "GitHub",
    "GitLab",
    "Linux",
    "Bash",
    "Zsh",
    "Jest",
    "Mocha",
    "Chai",
    "Cypress",
    "Playwright",
    "Selenium",
    "JUnit",
    "PyTest",
    "Pandas",
    "NumPy",
    "Matplotlib",
    "Scikit-learn",
    "TensorFlow",
    "Keras",
    "PyTorch",
    "OpenCV",
    "Hugging Face",
    "LangChain",
    "NLTK",
    "OAuth",
    "JWT",
    "OWASP",
    "Penetration Testing",
    "Burp Suite",
    "Metasploit",
    "GraphQL",
    "REST API",
    "gRPC",
    "WebSockets",
    "WebRTC",
    "Prettier",
    "ESLint",
    "Heroku",
    "Netlify",
    "Vercel",
  ];

  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "DevOps Engineer",
    "Data Scientist",
    "Machine Learning Engineer",
    "AI Researcher",
    "Product Manager",
    "Software Engineer",
    "Mobile Developer",
    "Security Engineer",
    "UI/UX Designer",
    "Cloud Engineer",
    "QA Engineer",
  ];

  const filteredSkills = skills.filter(
    (skill) =>
      skill.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedSkills.includes(skill)
  );

  const filteredRoles = roles.filter(
    (role) =>
      role.toLowerCase().includes(searchRole.toLowerCase()) &&
      !selectedRoles.includes(role)
  );

  const handleSelect = (skill) => {
    setSelectedSkills([...selectedSkills, skill]);
    setSearchTerm("");
    setShowSuggestions(false);
  };

  const handleRemoveSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const handleSelectRole = (role) => {
    setSelectedRoles([...selectedRoles, role]);
    setSearchRole("");
    setShowRoleSuggestions(false);
  };

  const handleRemoveRole = (role) => {
    setSelectedRoles(selectedRoles.filter((r) => r !== role));
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        skillWrapperRef.current &&
        !skillWrapperRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
      }
      if (
        roleWrapperRef.current &&
        !roleWrapperRef.current.contains(e.target)
      ) {
        setShowRoleSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const validateStep = () => {
    const newErrors = {};
    if (step === 1 && !name.trim()) newErrors.name = "Name is required";
    if (step === 2 && !experiences.trim())
      newErrors.experiences = "Experience is required";
    if (step === 3 && selectedSkills.length === 0)
      newErrors.skills = "Select at least one skill";
    if (step === 4 && !location.trim())
      newErrors.location = "Location is required";
    if (step === 5 && !education.trim())
      newErrors.education = "Education is required";
    if (step === 6 && selectedRoles.length === 0)
      newErrors.selectedRoles = "Select at least one role";
    if (step === 7 && !targetCompany.trim())
      newErrors.targetCompany = "Target company is required";
    if (step === 8 && !resume) newErrors.resume = "Resume is required";
    if (step === 9) {
      const urlRegex =
        /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_.-]+\/?$/;
      if (!gitUrl.trim()) newErrors.gitUrl = "GitHub URL is required";
      else if (!urlRegex.test(gitUrl))
        newErrors.gitUrl = "Enter a valid GitHub URL";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep((s) => s + 1);
  };

  const handlePrev = () => {
    setStep((s) => s - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    const token = localStorage.getItem("token");
    const uid = localStorage.getItem("uid");

    const profileData = {
      uid,
      name,
      skills: selectedSkills,
      experience: experiences,
      location,
      education,
      role: selectedRoles,
      dreamCompanies: [targetCompany],
      resumeUrl: "ihtisrhfkih",
      githubURL: gitUrl,
    };

    try {
      const res = await axios.post(
        "http://localhost:4000/profile/update",
        profileData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Profile updated successfully!");
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong!");
    }
  };

  const inputClass =
    "w-full h-10 py-3 pl-3 bg-linkedin-bg text-linkedin-text text-lg border border-linkedin-border rounded-md placeholder-transparent focus:outline-none focus:ring-2 focus:ring-linkedin-blue";

  const Step = ({ title, children }) => (
    <div className="space-y-3">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );

  const ErrorText = ({ children }) => (
    <p className="text-red-400 text-sm mt-1">{children}</p>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-linkedin-card px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-linkedin-bg border border-linkedin-border text-linkedin-text shadow-md rounded-xl p-6"
      >
        <AnimatePresence mode="wait">
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {step === 1 && (
              <Step title="What's your full name?">
                <input
                  className={inputClass}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <ErrorText>{errors.name}</ErrorText>}
              </Step>
            )}
            {step === 2 && (
              <Step title="What's your experience?">
                <input
                  className={inputClass}
                  value={experiences}
                  onChange={(e) => setExperiences(e.target.value)}
                />
                {errors.experiences && (
                  <ErrorText>{errors.experiences}</ErrorText>
                )}
              </Step>
            )}
            {step === 3 && (
              <Step title="Select your skills">
                <div ref={skillWrapperRef} className="relative">
                  <input
                    type="search"
                    className={inputClass}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                  />
                  {showSuggestions && filteredSkills.length > 0 && (
                    <ul className="absolute z-10 w-full bg-linkedin-bg border border-linkedin-border rounded mt-1 shadow max-h-40 overflow-y-auto">
                      {filteredSkills.map((skill, idx) => (
                        <li
                          key={idx}
                          className="px-4 py-2 text-linkedin-text hover:bg-linkedin-hover-blue cursor-pointer"
                          onClick={() => handleSelect(skill)}
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {errors.skills && <ErrorText>{errors.skills}</ErrorText>}
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-red-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </Step>
            )}
            {step === 4 && (
              <Step title="Where are you located?">
                <input
                  className={inputClass}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                {errors.location && <ErrorText>{errors.location}</ErrorText>}
              </Step>
            )}
            {step === 5 && (
              <Step title="Your Education">
                <input
                  className={inputClass}
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                />
                {errors.education && <ErrorText>{errors.education}</ErrorText>}
              </Step>
            )}
            {step === 6 && (
              <Step title="Which roles are you aiming for?">
                <div ref={roleWrapperRef} className="relative">
                  <input
                    type="search"
                    className={inputClass}
                    value={searchRole}
                    onChange={(e) => setSearchRole(e.target.value)}
                    onFocus={() => setShowRoleSuggestions(true)}
                  />
                  {showRoleSuggestions && filteredRoles.length > 0 && (
                    <ul className="absolute z-10 w-full bg-linkedin-bg border border-linkedin-border rounded mt-1 shadow max-h-40 overflow-y-auto">
                      {filteredRoles.map((role, idx) => (
                        <li
                          key={idx}
                          className="px-4 py-2 text-linkedin-text hover:bg-linkedin-hover-blue cursor-pointer"
                          onClick={() => handleSelectRole(role)}
                        >
                          {role}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {errors.selectedRoles && (
                  <ErrorText>{errors.selectedRoles}</ErrorText>
                )}
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedRoles.map((role, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {role}
                      <button
                        type="button"
                        onClick={() => handleRemoveRole(role)}
                        className="text-red-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </Step>
            )}
            {step === 7 && (
              <Step title="Target Company">
                <input
                  className={inputClass}
                  value={targetCompany}
                  onChange={(e) => setTargetCompany(e.target.value)}
                />
                {errors.targetCompany && (
                  <ErrorText>{errors.targetCompany}</ErrorText>
                )}
              </Step>
            )}
            {step === 8 && (
              <Step title="Upload your resume">
                <input
                  type="text"
                  className={inputClass}
                  onChange={(e) => setResume(e.target.value)}
                />
                {errors.resume && <ErrorText>{errors.resume}</ErrorText>}
              </Step>
            )}
            {step === 9 && (
              <Step title="GitHub Profile URL">
                <input
                  type="url"
                  className={inputClass}
                  value={gitUrl}
                  onChange={(e) => setGitURL(e.target.value)}
                />
                {errors.gitUrl && <ErrorText>{errors.gitUrl}</ErrorText>}
              </Step>
            )}
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-between items-center mt-6">
          {step > 1 && (
            <button
              type="button"
              className="bg-gray-600 px-4 py-2 rounded"
              onClick={handlePrev}
            >
              Prev
            </button>
          )}
          {step < 9 && (
            <button
              type="button"
              className="bg-linkedin-blue text-white px-4 py-2 rounded hover:bg-linkedin-hover-blue"
              onClick={handleNext}
            >
              Next
            </button>
          )}
          {step === 9 && (
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={karDiyaSubmit}
            >
              Submit
            </button>
          )}
        </div>
        <div className="text-sm text-right mt-2 text-linkedin-secondary-text">
          Step {step} of 9
        </div>
      </form>
    </div>
  );
}
