import { useState } from "react";

export default function Signup() {
  const [mail, setMail] = useState("");
  // const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  
    setError(""); // reset error
    try {
      const res = await fetch("http://localhost:4000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: mail,
          name: "sahnu", 
          password: password,
        }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        alert("✅ Signup Successful!");
        
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Network error or server down");
      console.error("Signup error:", err);
    }
  };
  

  return (
    <>
      <img
        src="./components/Authentication/assets/LinkedinDarkFull.png"
        className="max-w-28 max-h-7 relative left-4 top-4 cursor-pointer"
        alt="LinkedIn Logo"
      />
      <div className="flex justify-center items-center min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm shadow-sm shadow-slate-600 bg-linkedin-bg flex flex-col justify-center items-center border border-linkedin-border rounded-lg gap-4 p-4"
        >
          <h1 className="w-full max-w-[304px] text-linkedin-text text-4xl">
            Sign up
          </h1>

          {/* Email */}
          <div className="relative w-full max-w-[304px]">
            <input
              type="email"
              id="signup-email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              placeholder=" "
              required
              className="peer w-full h-[52px] pt-5 pl-3 bg-linkedin-bg text-linkedin-text text-lg border border-linkedin-border rounded-md placeholder-transparent focus:outline-none focus:ring-2 focus:ring-linkedin-blue"
            />
            <label
              htmlFor="signup-email"
              className="absolute left-3 top-2 text-sm text-linkedin-secondary-text transition-all 
      peer-focus:top-2 peer-focus:text-sm
      peer-valid:top-2 peer-valid:text-sm
      peer-placeholder-shown:top-4 peer-placeholder-shown:text-base"
            >
              Email
            </label>
          </div>

          {/* Phone */}
          {/* <div className="relative w-full max-w-[304px]">
            <input
              type="tel"
              id="signup-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder=" "
              required
              className="peer w-full h-[52px] pt-5 pl-3 bg-linkedin-bg text-linkedin-text text-lg border border-linkedin-border rounded-md placeholder-transparent focus:outline-none focus:ring-2 focus:ring-linkedin-blue"
            />
            <label
              htmlFor="signup-phone"
              className="absolute left-3 top-2 text-sm text-linkedin-secondary-text transition-all 
      peer-focus:top-2 peer-focus:text-sm
      peer-valid:top-2 peer-valid:text-sm
      peer-placeholder-shown:top-4 peer-placeholder-shown:text-base"
            >
              Phone Number
            </label>
          </div> */}

          {/* Password */}
          <div className="relative w-full max-w-[304px]">
            <input
              type={showPassword ? "text" : "password"}
              id="signup-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              required
              className="peer w-full h-[52px] pt-5 pl-3 bg-linkedin-bg text-linkedin-text text-lg border border-linkedin-border rounded-md placeholder-transparent focus:outline-none focus:ring-2 focus:ring-linkedin-blue"
            />
            <label
              htmlFor="signup-password"
              className="absolute left-3 top-2 text-sm text-linkedin-secondary-text transition-all 
      peer-focus:top-2 peer-focus:text-sm
      peer-valid:top-2 peer-valid:text-sm
      peer-placeholder-shown:top-4 peer-placeholder-shown:text-base"
            >
              Password
            </label>
          </div>

          {/* Confirm Password */}
          <div className="relative w-full max-w-[304px]">
            <input
              type={showPassword ? "text" : "password"}
              id="signup-confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder=" "
              required
              className="peer w-full h-[52px] pt-5 pl-3 bg-linkedin-bg text-linkedin-text text-lg border border-linkedin-border rounded-md placeholder-transparent focus:outline-none focus:ring-2 focus:ring-linkedin-blue"
            />
            <label
              htmlFor="signup-confirm-password"
              className="absolute left-3 top-2 text-sm text-linkedin-secondary-text transition-all 
      peer-focus:top-2 peer-focus:text-sm
      peer-valid:top-2 peer-valid:text-sm
      peer-placeholder-shown:top-4 peer-placeholder-shown:text-base"
            >
              Confirm Password
            </label>
          </div>

          {/* Show Password Toggle */}
          <div className="w-full max-w-[304px] text-linkedin-text flex items-center gap-2">
            <input
              type="checkbox"
              id="show-password"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="show-password">Show Password</label>
          </div>

          {error && (
            <div className="text-red-500 text-sm w-full max-w-[304px] text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full max-w-[304px] h-[52px] text-lg bg-linkedin-blue text-linkedin-text border border-linkedin-border rounded-md hover:bg-linkedin-hover-blue"
          >
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}
