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

        <div className="text-linkedin-text flex flex-row gap-20">
          <button className="border border-linkedin-border p-4 px-6  rounded-lg bg-linkedin-card hover:bg-linkedin-border transition-all">
            Personalized Mock Interviews
          </button>
          <button className="border border-linkedin-border p-4 px-6 rounded-lg bg-linkedin-card hover:bg-linkedin-border transition-all">
            Company-Specific Mock Interviews
          </button>
          <button className="border border-linkedin-border p-4 px-6 rounded-lg bg-linkedin-card hover:bg-linkedin-border transition-all">
            Job Roadmaps
          </button>
        </div>
      </div>
    </div>
  );
}
