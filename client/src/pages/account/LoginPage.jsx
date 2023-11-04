import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  if (!!user) {
    navigate("/account");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Please fill in all fields");
      return;
    }

    try {
      await axios.post("/api/users/login", {
        email,
        password,
      });
      const { data } = await axios.get("/api/users/profile");
      setUser(data);
      alert("User logged in successfully");
      navigate("/");
    } catch (err) {
      alert("Error logging in user");
    }
  };

  return (
    <div className="flex justify-center w-full pt-8">
      <div className="max-w-[1280px] w-full flex flex-col items-center">
        <h1 className="mb-4 text-3xl font-semibold text-primary">Login</h1>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit}
        >
          <input
            placeholder="Your email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="on"
            className="px-4 py-2 border border-black rounded-sm"
          />
          <input
            placeholder="Your password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="on"
            className="px-4 py-2 border border-black rounded-sm"
          />
          <button className="py-1 text-white rounded-lg bg-primary hover:bg-primary_dark hover:text-gray-200">
            Login
          </button>
        </form>
        <p className="mt-2 text-sm text-gray-700">
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
