export default function Login() {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-sm sm:h-[535px] shadow-sm shadow-slate-600 bg-linkedin-bg flex flex-col justify-center items-center border-linkedin-border rounded-lg">
          <h1 className="w-full max-w-[304px] h-[44px] text-linkedin-text text-4xl">
            Sign in
          </h1>
          <input
            className="w-full max-w-[304px] h-[52px] text-2xl bg-inherit text-linkedin-text"
            placeholder="Email or Phone Number"
          />
        </div>
      </div>
    </>
  );
}
