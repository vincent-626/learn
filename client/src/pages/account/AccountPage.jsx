import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NewPosting from "./NewPosting";
import EditPosting from "./EditPosting";

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

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];

    if (image.size / 1024 / 1024 > 5) {
      alert("Image must be less than 5MB");
      return;
    }

    const formData = new FormData();
    formData.append("user-image", image);

    try {
      const res = await axios.post("/api/users/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUser({ ...user, photo: res.data.photo });
      alert("Image uploaded successfully");
    } catch (err) {
      console.log(err);
      alert("Error uploading image");
    }
  };

  return (
    <div className="flex justify-center w-full pt-8">
      <div className="max-w-[1280px] w-full flex flex-col items-center">
        <div className="relative">
          <div className="flex items-center justify-center w-48 h-48 overflow-hidden border rounded-full shrink-0">
            {!!user && !!user.photo && (
              <img
                src={`http://localhost:3000/uploads/${user?.photo}`}
                alt=""
              />
            )}
          </div>
          <label
            htmlFor="image-input"
            className="absolute px-2 py-1 text-xl bg-white border rounded-full hover:bg-gray-100 bottom-2 right-2 hover:cursor-pointer"
          >
            <i className="fa-solid fa-pen"></i>
            <input
              id="image-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>
        {!!user ? (
          <div className="flex flex-col items-center">
            <p className="py-2 text-xl">{user.name}</p>
            <p className="pb-6">{user.email}</p>
          </div>
        ) : (
          ""
        )}
        <div className="pb-8">
          <EditPosting />
          <NewPosting />
        </div>
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
