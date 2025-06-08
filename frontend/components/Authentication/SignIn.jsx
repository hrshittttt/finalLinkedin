export default function Login() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-sm sm:h-[400px] shadow-sm shadow-slate-600 bg-linkedin-bg flex flex-col justify-center items-center border border-[0.5px] border-linkedin-border rounded-lg gap-4 p-4">
          <h1 className="w-full max-w-[304px] h-[44px] text-linkedin-text text-4xl">
            Sign in
          </h1>

          {/* Email Floating Input */}
          <div className="relative w-full max-w-[304px]">
            <input
              id="email"
              type="text"
              required
              className="peer w-full h-[52px] pt-5 pl-3 bg-linkedin-bg text-linkedin-text text-lg border border-linkedin-border rounded-md placeholder-transparent focus:outline-none focus:ring-2 focus:ring-linkedin-blue"
              placeholder="Email or Phone Number"
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
              className="peer w-full h-[52px] pt-5 pl-3 bg-linkedin-bg text-linkedin-text text-lg border border-linkedin-border rounded-md placeholder-transparent focus:outline-none focus:ring-2 focus:ring-linkedin-blue"
              placeholder="Password"
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
        </div>
      </div>
    </>
  );
}
