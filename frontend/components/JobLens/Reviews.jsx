export default function Reviews() {
  return (
    <div className="w-full max-w-[320px] mx-auto mt-6 mb-10 border border-linkedin-border bg-linkedin-bg relative left-44 rounded-lg p-5">
      <h2 className="text-2xl text-linkedin-text font-semibold mb-3">
        What Users Are Saying
      </h2>
      <div className="flex flex-col gap-4">
        <div className="bg-[#1c1c1c] border border-gray-700 rounded-lg p-4">
          <p className="text-slate-300 italic">
            “JobLens helped me understand exactly what to focus on for my Amazon
            interview. The mock sessions were a game-changer!”
          </p>
          <p className="text-blue-400 font-medium mt-2">
            — Priya Singh, Software Engineer Intern
          </p>
        </div>
        <div className="bg-[#1c1c1c] border border-gray-700 rounded-lg p-4">
          <p className="text-slate-300 italic">
            “I loved the clear roadmap for my dream company. It felt like I had
            a personal mentor guiding me throughout.”
          </p>
          <p className="text-blue-400 font-medium mt-2">
            — Rahul Mehta, Final Year CS Student
          </p>
        </div>
        <div className="bg-[#1c1c1c] border border-gray-700 rounded-lg p-4">
          <p className="text-slate-300 italic">
            “The UI is smooth, and the company-specific prep feels super
            targeted. Great work!”
          </p>
          <p className="text-blue-400 font-medium mt-2">
            — Ananya Desai, Aspiring Frontend Developer
          </p>
        </div>
      </div>
    </div>
  );
}
