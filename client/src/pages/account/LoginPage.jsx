import { useState } from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-full flex justify-center pt-8">
      <div className="max-w-[1280px] w-full flex flex-col items-center">
        <h1 className="mb-4 text-3xl text-primary font-semibold">Login</h1>
        <form className="flex flex-col gap-2">
          <input
            placeholder="Your email"
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="on"
            className="border border-black rounded-sm px-4 py-2"
          />
          <input
            placeholder="Your password"
            name="password"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="on"
            className="border border-black rounded-sm px-4 py-2"
          />
          <button className="bg-primary hover:bg-primary_dark hover:text-gray-200 rounded-lg py-1 text-white">
            Login
          </button>
        </form>
        <p className="text-sm text-gray-700 mt-2">
          Don't have an account yet?{" "}
          <Link
            to="/register"
            className="text-primary hover:text-primary_dark hover:underline"
          >
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
