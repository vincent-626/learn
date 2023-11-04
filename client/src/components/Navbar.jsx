import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function Navbar() {
  const { user } = useContext(UserContext);

  return (
    <nav className="flex justify-center w-full shadow-sm">
      <div className="max-w-[1280px] self-center flex justify-between items-center w-full sticky text-white text-3xl">
        <Link
          to="/"
          className="px-4 py-6 text-3xl font-semibold text-primary"
        >
          Learn
        </Link>
        <div className="flex items-center text-gray-500 rounded-full">
          <Link
            to={!!user ? "/account" : "/login"}
            className="flex items-center gap-1 py-6 pl-2 pr-4"
          >
            <div className="flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-300 border rounded-full">
              <i className="text-2xl relative top-[0.18rem] text-white fa-solid fa-user"></i>
            </div>
            {!user && <p className="text-xl">Login</p>}
            {!!user && <p className="text-xl">{user.name.split(" ")[0]}</p>}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
