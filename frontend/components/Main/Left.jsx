
export default function Left() {
  
  return (
    <div className="flex flex-col gap-2">


       

      <div className="w-80 h-56 bg-linkedin-bg rounded-lg relative left-44 top-5 border border-linkedin-border">
      <div className="w-79 h-14">
        <img
          className="rounded-t-lg"
          src="./Components/JobLens/Banner.png"
        />
      </div>
      <img
        src="./src/assets/Profile.png"
        className="rounded-[50%] h-16 w-16 border border-white relative left-4 bottom-6"
      />
  
      
      
         <div className=" flex flex-col w-56 h-24 relative bottom-4 px-4">
           <h3 className="text-linkedin-text font-bold text-xl">
           Ashwin Chhipa
           </h3>
           <div className="flex flex-col gap-1">
             <p className="text-xs text-white"> Fresher</p>
             <p className="text-xs text-gray-400">Udaipur, Rajasthan</p>
             <span className="text-xs font-bold text-linkedin-text">
               Mohanlal Sukhadia University (MLSU), Udaipur
             </span>
           </div>
         </div>
       
      
    </div>
     
   

      




      <div className="w-56 h-20 bg-linkedin-bg rounded-lg relative left-44 top-5 border border-linkedin-border flex flex-col justify-center p-4 gap-3">
        <div className="flex flex-row justify-between text-linkedin-text text-xs font-bold">
          <a href="#" className="hover:underline">
            Profile viewers
          </a>
          <a href="#" className="text-blue-400 hover:underline">
            69420
          </a>
        </div>
        <div className="flex flex-row justify-between text-linkedin-text text-xs font-bold">
          <a href="#" className="hover:underline">
            Post impressions
          </a>
          <a href="#" className="text-blue-400 hover:underline">
            69
          </a>
        </div>
      </div>
      <div className="w-56 h-36 bg-linkedin-bg rounded-lg relative left-44 top-5 border flex flex-row items-center border-linkedin-border pl-4">
        <ul className="text-linkedin-secondary-text text-sm font-bold flex flex-col gap-2">
          <li>
            <a href="#" className="hover:underline">
              Saved items
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Groups
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Newsletters
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Events
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
