export default function Left() {
  return (
    <div className="w-80 h-56 bg-linkedin-bg rounded-lg relative left-44 top-5 border border-linkedin-border">
      <div className="w-79 h-14">
        <img
          className="rounded-t-lg"
          src="./Components/JobLens/Banner.png"
        ></img>
      </div>
      <img
        src="./src/assets/Profile.png"
        className="rounded-[50%] h-16 w-16 border border-white relative left-4 bottom-6"
      ></img>
      <div className=" flex flex-col w-72 h-24 relative bottom-4 px-4">
        <h3 className="text-linkedin-text font-bold text-xl">Harshit Suthar</h3>
        <div className="flex flex-col gap-1">
          <p className="text-xs text-white">CSE 28'@IET,MLSU</p>
          <p className="text-xs text-gray-400">Udaipur, Rajasthan</p>
          <span className="text-xs font-bold text-linkedin-text">
            Mohanlal Sukhadia University (MLSU), Udaipur
          </span>
        </div>
      </div>
    </div>
  );
}
