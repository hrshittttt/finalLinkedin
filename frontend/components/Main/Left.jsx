import { useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../src/assets/firebase"; 



export default function Left() {
  const [userData, setUserData] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Logged in UID:", user.uid);

        try {
          const docRef = doc(db, "profiles", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log("No user profile found");
          }
        } catch (err) {
          console.error("Error fetching Firestore:", err);
        }
      } else {
        console.log("Not logged in");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userData) {
      console.log("User data updated:", userData);
    }
  }, [userData]);

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
  
      {userData ? (
      
         <div className=" flex flex-col w-56 h-24 relative bottom-4 px-4">
           <h3 className="text-linkedin-text font-bold text-xl">
           {userData.name}
           </h3>
           <div className="flex flex-col gap-1">
             <p className="text-xs text-white">{userData.experience}</p>
             <p className="text-xs text-gray-400">{userData.location}</p>
             <span className="text-xs font-bold text-linkedin-text">
               Mohanlal Sukhadia University (MLSU), Udaipur
             </span>
           </div>
         </div>
       
      ) : (
        <div className="px-4 pt-4 text-white text-sm">Loading profile...</div>
      )}
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
