import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:4000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: mail,
          name: "sahnu",
          password: password,
        }),
      });
      
      const data = await res.json();
      if (res.ok) {
        
        alert("✅ Signup Successful!");
        navigate("/login")

      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Network error or server down");
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
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
              className={`absolute left-3 text-linkedin-secondary-text transition-all ${
                mail.length > 0
                  ? "top-1.5 text-xs"
                  : "peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs"
              }`}
            >
              Email
            </label>
          </div>

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
              className={`absolute left-3 text-linkedin-secondary-text transition-all ${
                password.length > 0
                  ? "top-1.5 text-xs"
                  : "peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs"
              }`}
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
              className={`absolute left-3 text-linkedin-secondary-text transition-all ${
                confirmPassword.length > 0
                  ? "top-1.5 text-xs"
                  : "peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs"
              }`}
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

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm w-full max-w-[304px] text-center">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full max-w-[304px] h-[52px] text-lg border border-linkedin-border rounded-md flex items-center justify-center gap-2 transition-all ${
              isLoading
                ? "bg-linkedin-bg text-linkedin-secondary-text cursor-not-allowed"
                : "bg-linkedin-blue text-linkedin-text hover:bg-linkedin-hover-blue"
            }`}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-linkedin-secondary-text"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
