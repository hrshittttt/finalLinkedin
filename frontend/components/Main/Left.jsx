export default function Left() {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-[225px] h-[225px] bg-linkedin-bg rounded-lg relative left-[174px] top-[20px] border-[0.5px] border-linkedin-border">
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
      <div className="w-[225px] h-[75px] bg-linkedin-bg rounded-lg relative left-[174px] top-[20px] border-[0.5px] border-linkedin-border"></div>
      <div className="w-[225px] h-[88px] bg-linkedin-bg rounded-lg relative left-[174px] top-[20px] border-[0.5px] border-linkedin-border"></div>
      <div className="w-[225px] h-[84px] bg-linkedin-bg rounded-lg relative left-[174px] top-[20px] border-[0.5px] border-linkedin-border"></div>
    </div>
  );
}
