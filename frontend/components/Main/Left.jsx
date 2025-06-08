export default function Left() {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-56 h-56 bg-linkedin-bg rounded-lg relative left-44 top-5 border border-linkedin-border">
        <div className="w-[225px] h-[58]">
          <img
            className="rounded-t-lg"
            src="./src/assets/LinkedInBanner.png"
          ></img>
          <img
            src="./src/assets/Profile.png"
            className="rounded-[50%] h-[72px] w-[72px] border border-white relative left-4 bottom-6"
          ></img>
        </div>
      </div>
      <div className="w-56 h-20 bg-linkedin-bg rounded-lg relative left-44 top-5 border border-linkedin-border"></div>
      <div className="w-56 h-24 bg-linkedin-bg rounded-lg relative left-44 top-5 border border-linkedin-border"></div>
      <div className="w-56 h-20 bg-linkedin-bg rounded-lg relative left-44 top-5 border border-linkedin-border"></div>
    </div>
  );
}
