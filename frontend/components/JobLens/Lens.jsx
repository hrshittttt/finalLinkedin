import { useEffect, useState } from "react";

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    skills: "",
    experience: "",
    dreamCompanies: "",
    interests: "",
    resumeUrl: "",
    githubURL: "",
    education: { degree: "", institution: "", selectedSkills: [] },
  });

  const [availableSkills, setAvailableSkills] = useState([]);
  const [skillQuery, setSkillQuery] = useState("");

  useEffect(() => {
    // Simulate fetching skills from API
    setTimeout(() => {
      setAvailableSkills([
        // 🧠 Programming Languages
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

        // 🎨 Frontend Development
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

        // 🛠️ Backend Development
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

        // 📱 Mobile Development
        "React Native",
        "Flutter",
        "SwiftUI",
        "Jetpack Compose",
        "Ionic",
        "Xamarin",

        // 🗃️ Databases
        "MongoDB",
        "MySQL",
        "PostgreSQL",
        "SQLite",
        "Oracle DB",
        "MariaDB",
        "Firebase",
        "Supabase",
        "Redis",

        // ☁️ Cloud & DevOps
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

        // 🔍 Testing
        "Jest",
        "Mocha",
        "Chai",
        "Cypress",
        "Playwright",
        "Selenium",
        "JUnit",
        "PyTest",

        // 📊 Data Science & ML
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

        // 🔐 Security
        "OAuth",
        "JWT",
        "OWASP",
        "Penetration Testing",
        "Burp Suite",
        "Metasploit",

        // 🔗 Other Skills
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
      ]);
    }, 500);
  }, []);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleEducationChange = (key, value) => {
    setFormData({
      ...formData,
      education: {
        ...formData.education,
        [key]: value,
      },
    });
  };

  const handleSkillClick = (skill) => {
    const updatedSkills = formData.education.selectedSkills.includes(skill)
      ? formData.education.selectedSkills.filter((s) => s !== skill)
      : [...formData.education.selectedSkills, skill];

    setFormData({
      ...formData,
      education: {
        ...formData.education,
        selectedSkills: updatedSkills,
      },
    });
  };

  const filteredSkills = availableSkills.filter((skill) =>
    skill.toLowerCase().includes(skillQuery.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-linkedin-bg p-6 rounded-lg shadow-sm shadow-slate-600 border border-linkedin-border flex flex-col gap-4"
      >
        <h1 className="text-linkedin-text text-3xl font-bold text-center">
          Build Profile
        </h1>

        {[
          { id: "name", label: "Name" },
          { id: "location", label: "Location" },
          { id: "skills", label: "Skills" },
          { id: "experience", label: "Experience" },
          { id: "dreamCompanies", label: "Dream Companies" },
          { id: "interests", label: "Interests" },
          { id: "resumeUrl", label: "Resume URL" },
          { id: "githubURL", label: "GitHub URL" },
        ].map(({ id, label }) => (
          <div key={id} className="relative">
            <input
              type="text"
              id={id}
              value={formData[id]}
              onChange={(e) => handleChange(id, e.target.value)}
              placeholder={label}
              className="peer w-full h-[52px] pt-5 pl-3 bg-linkedin-bg text-linkedin-text text-sm border border-linkedin-border rounded-md placeholder-transparent focus:outline-none focus:ring-2 focus:ring-linkedin-blue"
              required
            />
            <label
              htmlFor={id}
              className="pointer-events-none absolute left-3 top-3 text-linkedin-secondary-text text-xs transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
            >
              {label}
            </label>
          </div>
        ))}

        {/* <div className="flex gap-2">
          <input
            type="text"
            placeholder="Degree"
            value={formData.education.degree}
            onChange={(e) => handleEducationChange("degree", e.target.value)}
            className="w-1/2 h-[52px] pt-5 pl-3 bg-linkedin-bg text-linkedin-text text-sm border border-linkedin-border rounded-md placeholder-transparent focus:outline-none focus:ring-2 focus:ring-linkedin-blue"
            required
          />
          <input
            type="text"
            placeholder="Institution"
            value={formData.education.institution}
            onChange={(e) =>
              handleEducationChange("institution", e.target.value)
            }
            className="w-1/2 h-[52px] pt-5 pl-3 bg-linkedin-bg text-linkedin-text text-sm border border-linkedin-border rounded-md placeholder-transparent focus:outline-none focus:ring-2 focus:ring-linkedin-blue"
            required
          />
        </div> */}

        <div>
          <label className="text-linkedin-text text-sm">
            Search & Select Skills:
          </label>
          <input
            type="text"
            placeholder="Search skills"
            value={skillQuery}
            onChange={(e) => setSkillQuery(e.target.value)}
            className="mt-2 w-full h-[42px] pl-3 bg-linkedin-bg text-linkedin-text text-sm border border-linkedin-border rounded-md focus:outline-none focus:ring-2 focus:ring-linkedin-blue"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {filteredSkills.map((skill, index) => (
              <span
                key={index}
                onClick={() => handleSkillClick(skill)}
                className={`cursor-pointer px-2 py-1 rounded-full text-xs ${
                  formData.education.selectedSkills.includes(skill)
                    ? "bg-linkedin-blue text-white"
                    : "bg-linkedin-border text-white hover:bg-linkedin-hover-blue"
                }`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="text-linkedin-text text-sm">Selected Skills:</label>
          <ul className="list-disc list-inside text-linkedin-text text-sm mt-1">
            {formData.education.selectedSkills.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          className="mt-4 h-[52px] bg-linkedin-blue text-linkedin-text rounded-md hover:bg-linkedin-hover-blue"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
