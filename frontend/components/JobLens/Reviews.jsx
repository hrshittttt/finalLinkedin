import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faQuoteLeft,
  faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";

export default function Reviews() {
  return (
    <div className="w-full max-w-[320px] mx-auto mt-6 mb-10 border border-linkedin-border bg-linkedin-bg relative left-44 rounded-lg p-5">
      <h2 className="text-2xl text-linkedin-text font-semibold mb-3">
        What Users Are Saying
      </h2>

      <div className="flex flex-col gap-4">
        {[
          {
            text: "JobLens helped me understand exactly what to focus on for my Amazon interview. The mock sessions were a game-changer!",
            name: "Priya Singh",
            title: "Software Engineer Intern",
          },
          {
            text: "I loved the clear roadmap for my dream company. It felt like I had a personal mentor guiding me throughout.",
            name: "Rahul Mehta",
            title: "Final Year CS Student",
          },
          {
            text: "The UI is smooth, and the company-specific prep feels super targeted. Great work!",
            name: "Ananya Desai",
            title: "Aspiring Frontend Developer",
          },
        ].map((review, i) => (
          <div
            key={i}
            className="bg-[#1c1c1c] border border-gray-700 rounded-lg p-4"
          >
            <p className="text-slate-300 italic relative pl-6">
              <FontAwesomeIcon
                icon={faQuoteLeft}
                className="absolute left-0 top-[2px] text-slate-500"
              />
              {review.text}
              <FontAwesomeIcon
                icon={faQuoteRight}
                className="ml-1 text-slate-500"
              />
            </p>
            <p className="text-blue-400 font-medium mt-2 flex items-center gap-2">
              <FontAwesomeIcon icon={faUserCircle} className="text-lg" />{" "}
              {review.name}, {review.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
