import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [university, setUniversity] = useState("");
  const [filled, setFilled] = useState(true);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (!!user) {
      navigate("/account");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === "" || email === "" || password === "" || university === "") {
      setFilled(false);
      return;
    }

    setFilled(true);

    try {
      await axios.post("/api/users/register", {
        name,
        email,
        password,
        university,
      });
      alert("User registered successfully");
      navigate("/login");
    } catch (err) {
      alert("Error registering user");
    }
  };

  return (
    <div className="flex justify-center w-full pt-8">
      <div className="max-w-[1280px] w-full flex flex-col items-center">
        <h1 className="mb-4 text-3xl font-semibold text-primary">Register</h1>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit}
        >
          <input
            placeholder="Your name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="on"
            className="px-4 py-2 border border-black rounded-sm"
          />
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
          <input
            placeholder="Your university"
            name="university"
            type="text"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            autoComplete="on"
            className="px-4 py-2 border border-black rounded-sm"
          />
          {!filled && (
            <p className="self-center text-sm text-red-500">
              Please fill in all fields
            </p>
          )}
          <button className="py-1 text-white rounded-lg bg-primary hover:bg-primary_dark hover:text-gray-200">
            Register
          </button>
        </form>
        <p className="mt-2 text-sm text-gray-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary hover:text-primary_dark hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
