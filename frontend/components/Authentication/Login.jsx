import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginForm() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [experiences, setExperiences] = useState("");
  const [education, setEducation] = useState("");
  const [targetCompany, setTargetCompany] = useState("");
  const [resume, setResume] = useState(null);
  const [gitUrl, setGitURL] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [errors, setErrors] = useState({});
  const wrapperRef = useRef(null);

  const skills = ["JavaScript", "Python", "React", "Node.js", "HTML", "CSS"];

  const filteredSkills = skills.filter(
    (skill) =>
      skill.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedSkills.includes(skill)
  );

  const handleSelect = (skill) => {
    setSelectedSkills([...selectedSkills, skill]);
    setSearchTerm("");
    setShowSuggestions(false);
  };

  const handleRemoveSkill = (skill) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
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
    if (step === 6 && !targetCompany.trim())
      newErrors.targetCompany = "Target company is required";
    if (step === 7 && !resume) newErrors.resume = "Resume is required";
    if (step === 8) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    console.log({
      name,
      experiences,
      selectedSkills,
      location,
      education,
      targetCompany,
      resume,
      gitUrl,
    });
  };

  const commonInputClass =
    "w-full h-[52px] pt-5 pl-3 bg-linkedin-bg text-linkedin-text text-lg border border-linkedin-border rounded-md placeholder-transparent focus:outline-none focus:ring-2 focus:ring-linkedin-blue";

  const buttonClass =
    "w-full h-[52px] text-lg border border-linkedin-border rounded-md transition-colors duration-300";

  return (
    <div className="flex justify-center items-center min-h-screen bg-linkedin-bg px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-linkedin-bg border border-linkedin-border rounded-lg shadow-sm shadow-slate-600 p-4 flex flex-col items-center gap-4"
      >
        <AnimatePresence mode="wait">
          {step === 1 && (
            <StepWrapper key="step1">
              <LabelText>What's your full name?</LabelText>
              <input
                className={commonInputClass}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder=" "
                required
              />
              {errors.name && <ErrorText>{errors.name}</ErrorText>}
            </StepWrapper>
          )}

          {step === 2 && (
            <StepWrapper key="step2">
              <LabelText>What's your experience?</LabelText>
              <input
                className={commonInputClass}
                value={experiences}
                onChange={(e) => setExperiences(e.target.value)}
                placeholder=" "
                required
              />
              {errors.experiences && (
                <ErrorText>{errors.experiences}</ErrorText>
              )}
            </StepWrapper>
          )}

          {step === 3 && (
            <StepWrapper key="step3">
              <LabelText>Select your skills</LabelText>
              <div ref={wrapperRef} className="relative w-full">
                <input
                  type="search"
                  className={commonInputClass}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder=" "
                />
                {showSuggestions && filteredSkills.length > 0 && (
                  <ul className="absolute w-full bg-linkedin-bg mt-2 border border-linkedin-border rounded-md shadow-md max-h-40 overflow-y-auto z-20">
                    {filteredSkills.map((skill, idx) => (
                      <li
                        key={idx}
                        className="px-4 py-2 hover:bg-linkedin-hover-blue cursor-pointer"
                        onClick={() => handleSelect(skill)}
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {errors.skills && <ErrorText>{errors.skills}</ErrorText>}
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-red-400 hover:text-red-300"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </StepWrapper>
          )}

          {/* Other steps same pattern... */}

          {step === 9 && (
            <StepWrapper key="step9">
              <LabelText>Review your details</LabelText>
              <div className="text-sm space-y-2 mt-3 text-linkedin-text">
                <p>
                  <strong>Name:</strong> {name}
                </p>
                <p>
                  <strong>Experience:</strong> {experiences}
                </p>
                <p>
                  <strong>Skills:</strong> {selectedSkills.join(", ")}
                </p>
                <p>
                  <strong>Location:</strong> {location}
                </p>
                <p>
                  <strong>Education:</strong> {education}
                </p>
                <p>
                  <strong>Target Company:</strong> {targetCompany}
                </p>
                <p>
                  <strong>GitHub:</strong> {gitUrl}
                </p>
                <p>
                  <strong>Resume:</strong> {resume?.name}
                </p>
              </div>
            </StepWrapper>
          )}
        </AnimatePresence>

        <div className="flex justify-between items-center w-full mt-6 gap-3">
          {step > 1 && (
            <button
              type="button"
              className={`${buttonClass} bg-gray-700 text-white hover:bg-gray-600`}
              onClick={handlePrev}
            >
              Back
            </button>
          )}
          {step < 9 && (
            <button
              type="button"
              className={`${buttonClass} bg-linkedin-blue text-white hover:bg-linkedin-hover-blue`}
              onClick={handleNext}
            >
              Next
            </button>
          )}
          {step === 9 && (
            <button
              type="submit"
              className={`${buttonClass} bg-green-600 text-white hover:bg-green-500`}
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

const StepWrapper = ({ children }) => (
  <motion.div
    initial={{ x: 100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: -100, opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="w-full"
  >
    {children}
  </motion.div>
);

const LabelText = ({ children }) => (
  <h2 className="text-xl font-semibold text-linkedin-text text-left mb-2">
    {children}
  </h2>
);

const ErrorText = ({ children }) => (
  <p className="text-red-400 text-sm mt-1">{children}</p>
);
