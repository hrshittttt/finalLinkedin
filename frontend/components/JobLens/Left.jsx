import Profile from "./Profile.jsx";
import Reviews from "./Reviews.jsx";

export default function Left() {
  return (
    <div className="flex flex-col gap-3">
      <Profile />
      <Reviews />
    </div>
  );
}
