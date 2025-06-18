import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../src/assets/firebase";
import { Link , useNavigate } from "react-router-dom";


export default function Login() {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, mail, pass);
      const idToken = await userCredential.user.getIdToken();

      const res = await fetch("http://localhost:4000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: mail, password: pass }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      localStorage.setItem("token", idToken);
      localStorage.setItem("uid", userCredential.user.uid);


      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Login Failed:", error.message);
      alert(error.message);
    } finally {
      setLoading(false);
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
          className="w-full max-w-sm sm:h-[400px] shadow-sm shadow-slate-600 bg-linkedin-bg flex flex-col justify-center items-center border border-linkedin-border rounded-lg gap-4 p-4"
        >
          <h1 className="w-full max-w-[304px] h-[44px] text-linkedin-text text-4xl">
            Sign in
          </h1>

          {/* Email Input */}
          <div className="relative w-full max-w-[304px]">
            <input
              id="email"
              type="email"
              required
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              placeholder=" "
              className="peer w-full h-[52px] pt-5 pl-3 bg-linkedin-bg text-linkedin-text text-lg border border-linkedin-border rounded-md placeholder-transparent focus:outline-none focus:ring-2 focus:ring-linkedin-blue"
            />
            <label
              htmlFor="email"
              className={`absolute left-3 text-linkedin-secondary-text transition-all ${
                mail.length > 0
                  ? "top-1.5 text-xs"
                  : "peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs"
              }`}
            >
              Email or Phone Number
            </label>
          </div>

          {/* Password Input */}
          <div className="relative w-full max-w-[304px]">
            <input
              id="password"
              type="password"
              required
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder=" "
              className="peer w-full h-[52px] pt-5 pl-3 bg-linkedin-bg text-linkedin-text text-lg border border-linkedin-border rounded-md placeholder-transparent focus:outline-none focus:ring-2 focus:ring-linkedin-blue"
            />
            <label
              htmlFor="password"
              className={`absolute left-3 text-linkedin-secondary-text transition-all ${
                pass.length > 0
                  ? "top-1.5 text-xs"
                  : "peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1.5 peer-focus:text-xs"
              }`}
            >
              Password
            </label>
          </div>

          {/* Submit Button with Spinner */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full max-w-[304px] h-[52px] text-lg flex justify-center items-center gap-2 ${
              loading
                ? "bg-linkedin-disabled cursor-not-allowed"
                : "bg-linkedin-blue hover:bg-linkedin-hover-blue"
            } text-linkedin-text border border-linkedin-border rounded-md`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
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
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            ) : (
              "Sign in"
            )}
          </button>

          <span className="cursor-default text-linkedin-text">
            New to LinkedIn? Make an account{" "}
            
            <Link className="text-linkedin-blue cursor-pointer underline"  to="/signup">here</Link>

          </span>
        </form>
      </div>
    </>
  );
}
