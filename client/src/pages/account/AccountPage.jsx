import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AccountPage() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      setUser(null);
      alert("User logged out successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Error logging out user");
    }
  };

  return (
    <div className="flex justify-center w-full pt-8">
      <div className="max-w-[1280px] w-full flex flex-col items-center">
        <p className="py-2">
          {user.name} ({user.email})
        </p>
        <button
          onClick={handleLogout}
          className="px-16 py-1 text-white rounded-lg bg-primary hover:bg-primary_dark hover:text-gray-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default AccountPage;
