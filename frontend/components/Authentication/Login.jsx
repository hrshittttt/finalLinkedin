import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  const handleMailChange = (e) => setMail(e.target.value);
  const handlePassChange = (e) => setPass(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ Prevent page reload
    console.log("Form submitted with:", { mail, pass });

    try {
      const res = await fetch("http://localhost:4000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: mail,
          password: pass,
        }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }
  
      console.log("✅ Login success:", data);
      // Optionally save token or redirect
    } catch (error) {
      console.error("❌ Login Failed:", error.message);
    }
  };

  return (
    <>
      <img
        src="./components/Authentication/assets/LinkedinDarkFull.png"
        className="max-w-28 max-h-7 relative left-4 top-4 cursor-pointer"
      ></img>
      <div className="flex justify-center items-center min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm sm:h-[400px] shadow-sm shadow-slate-600 bg-linkedin-bg flex flex-col justify-center items-center border border-linkedin-border rounded-lg gap-4 p-4"
        >
          <h1 className="w-full max-w-[304px] h-[44px] text-linkedin-text text-4xl">
            Sign in
          </h1>

          {/* Email Floating Input */}
          <div className="relative w-full max-w-[304px]">
            <input
              id="email"
              type="text"
              required
              value={mail}
              onChange={handleMailChange}
              placeholder="Email or Phone Number"
              className="peer w-full h-[52px] pt-5 pl-3 bg-linkedin-bg text-linkedin-text text-lg border border-linkedin-border rounded-md placeholder-transparent focus:outline-none focus:ring-2 focus:ring-linkedin-blue"
            />
            <label
              htmlFor="email"
              className="pointer-events-none absolute left-3 top-3 text-linkedin-secondary-text text-sm transition-all 
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-base 
                peer-focus:top-2 peer-focus:text-sm"
            >
              Email or Phone Number
            </label>
          </div>

          {/* Password Floating Input */}
          <div className="relative w-full max-w-[304px]">
            <input
              id="password"
              type="password"
              required
              value={pass}
              onChange={handlePassChange}
              placeholder="Password"
              className="peer w-full h-[52px] pt-5 pl-3 bg-linkedin-bg text-linkedin-text text-lg border border-linkedin-border rounded-md placeholder-transparent focus:outline-none focus:ring-2 focus:ring-linkedin-blue"
            />
            <label
              htmlFor="password"
              className="pointer-events-none absolute left-3 top-3 text-linkedin-secondary-text text-sm transition-all 
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-base 
                peer-focus:top-2 peer-focus:text-sm"
            >
              Password
            </label>
          </div>

          <button
            type="submit"
            className="w-full max-w-[304px] h-[52px] text-lg bg-linkedin-blue text-linkedin-text border border-linkedin-border rounded-md hover:bg-linkedin-hover-blue"
          >
            Sign in
          </button>

          <span className="cursor-default text-linkedin-text">
            New to LinkedIn? Make an account{" "}
            <a className="text-linkedin-blue cursor-pointer underline" href="#">
              here
            </a>
          </span>
        </form>
      </div>
    </>
  );
}
