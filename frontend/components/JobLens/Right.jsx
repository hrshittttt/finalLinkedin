export default function Right() {
  return (
    <div className="relative top-5 px-4 md:left-48 flex flex-col gap-7">
      {/* Intro Section */}
      <div className="w-full max-w-[804px] mx-auto border border-linkedin-border bg-linkedin-bg rounded-lg p-5">
        <h1 className="text-4xl text-linkedin-text font-semibold mb-1">
          JobLens
        </h1>
        <p className="text-slate-300 font-normal mb-4">
          A new way to help professionals land their dream jobs.
        </p>

        <div className="text-linkedin-text flex flex-col gap-4 font-medium">
          <div>
            <h3 className="text-blue-400 hover:underline inline-block">
              🎯 Personalized Mock Interviews
            </h3>{" "}
            <p className="text-slate-300 text-sm ml-1 inline">
              – Practice mock interviews tailored to your profile to boost
              confidence and improve your performance.
            </p>
          </div>
          <div>
            <h3 className="text-blue-400 hover:underline inline-block">
              🏢 Company-Specific Mock Interviews
            </h3>{" "}
            <p className="text-slate-300 text-sm ml-1 inline">
              – Prepare smarter with mock interviews designed specifically for
              your target company’s interview style and expectations.
            </p>
          </div>
          <div>
            <h3 className="text-blue-400 hover:underline inline-block">
              🗺️ Job Roadmaps
            </h3>{" "}
            <p className="text-slate-300 text-sm ml-1 inline">
              – Get clear, step-by-step roadmaps to land your dream job —
              including skills to learn, projects to build, and strategies to
              stand out.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="w-full max-w-[804px] mx-auto border border-linkedin-border bg-linkedin-bg rounded-lg p-5">
        <h2 className="text-2xl text-linkedin-text font-semibold mb-4">
          What Users Are Saying
        </h2>
        <div className="flex flex-col gap-4">
          <blockquote className="bg-[#1c1c1c] border border-gray-700 rounded-lg p-4">
            <p className="text-slate-300 italic">
              “JobLens helped me understand exactly what to focus on for my
              Amazon interview. The mock sessions were a game-changer!”
            </p>
            <footer className="text-blue-400 font-medium mt-2">
              — Priya Singh, Software Engineer Intern
            </footer>
          </blockquote>
          <blockquote className="bg-[#1c1c1c] border border-gray-700 rounded-lg p-4">
            <p className="text-slate-300 italic">
              “I loved the clear roadmap for my dream company. It felt like I
              had a personal mentor guiding me throughout.”
            </p>
            <footer className="text-blue-400 font-medium mt-2">
              — Rahul Mehta, Final Year CS Student
            </footer>
          </blockquote>
          <blockquote className="bg-[#1c1c1c] border border-gray-700 rounded-lg p-4">
            <p className="text-slate-300 italic">
              “The UI is smooth, and the company-specific prep feels super
              targeted. Great work!”
            </p>
            <footer className="text-blue-400 font-medium mt-2">
              — Ananya Desai, Aspiring Frontend Developer
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
