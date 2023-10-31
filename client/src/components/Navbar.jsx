import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full flex justify-center shadow-sm">
      <div className="max-w-[1280px] self-center flex justify-between items-center w-full sticky text-white text-3xl">
        <Link
          to="/"
          className="font-semibold text-3xl text-primary py-6 px-4"
        >
          Learn
        </Link>
        <div className="flex items-center rounded-full text-gray-500">
          <Link
            to="/login"
            className="flex items-center gap-1 py-6 pl-2 pr-4"
          >
            <div className="rounded-full border bg-gray-300 overflow-hidden w-8 h-8 flex items-center justify-center">
              <i className="text-2xl relative top-[0.18rem] text-white fa-solid fa-user"></i>
            </div>
            <p className="text-xl">Login</p>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
