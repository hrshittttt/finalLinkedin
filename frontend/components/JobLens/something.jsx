import { useState, useRef, useEffect } from "react";

export default function SkillSearch() {
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

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef(null);

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

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitted skills:", selectedSkills);
  }

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 border border-linkedin-border bg-linkedin-bg p-12 rounded-lg"
      >
        <h1 className="text-center text-linkedin-text font-extrabold text-3xl">
          Enter your information here
        </h1>
        <input
          type="text"
          placeholder="Full Name*"
          className="bg-linkedin-card border border-linkedin-border rounded-md px-4 py-2 text-linkedin-text placeholder:text-sm placeholder:font-bold"
          required
        />
        <input
          type="text"
          placeholder="Location"
          className="bg-linkedin-card border border-linkedin-border rounded-md px-4 py-2 text-linkedin-text placeholder:text-sm placeholder:font-bold"
        />
        <input
          type="text"
          placeholder="Experiences*"
          className="bg-linkedin-card border border-linkedin-border rounded-md px-4 py-2 text-linkedin-text placeholder:text-sm placeholder:font-bold"
          required
        />
        <input
          type="text"
          placeholder="Education"
          className="bg-linkedin-card border border-linkedin-border rounded-md px-4 py-2 text-linkedin-text placeholder:text-sm placeholder:font-bold"
        />

        {/* Search input */}
        <div ref={wrapperRef} className="relative">
          <input
            type="search"
            placeholder="Skills*"
            className="bg-linkedin-card border border-linkedin-border rounded-md px-4 py-2 text-linkedin-text placeholder:text-sm placeholder:font-bold w-full"
            value={searchTerm}
            onFocus={() => setShowSuggestions(true)}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {showSuggestions && filteredSkills.length > 0 && (
            <ul className="absolute z-10 w-full max-h-40 overflow-y-auto bg-white border border-gray-300 rounded mt-1 shadow">
              {filteredSkills.map((skill, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                  onClick={() => handleSelect(skill)}
                >
                  {skill}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Selected Skills Below */}
        {selectedSkills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        <input
          type="text"
          placeholder="Target companies"
          className="bg-linkedin-card border border-linkedin-border rounded-md px-4 py-2 text-linkedin-text placeholder:text-sm placeholder:font-bold"
        />
        <label className="inline-block px-4 py-2 bg-linkedin-card rounded-md text-slate-400 hover:bg-linkedin-border cursor-pointer border border-linkedin-border font-bold text-sm">
          Upload Resume
          <input type="file" className="hidden" />
        </label>
        <input
          type="url"
          placeholder="GitHub link"
          className="bg-linkedin-card border border-linkedin-border rounded-md px-4 py-2 text-linkedin-text placeholder:text-sm placeholder:font-bold"
        />
        <button
          type="submit"
          className="bg-green-700 text-linkedin-text px-4 py-2 rounded-md hover:bg-green-800 transition-colors duration-100 ease-linear font-bold"
        >
          Submit Info
        </button>
      </form>
    </div>
  );
}
