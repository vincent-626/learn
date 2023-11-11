import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";

function EditTutor() {
  const { user, setUser } = useContext(UserContext);
  const [skills, setSkills] = useState("");
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getTutor = async () => {
      try {
        if (!user?.isTutor) {
          alert("You are not a tutor");
          navigate("/account");
          return;
        }

        const res = await axios.get("/api/users/getTutor", {
          params: { user_id: user.id },
        });
        setSkills(res.data[0].skills);
        setDescription(res.data[0].description);
        setRate(res.data[0].rate);
      } catch (err) {
        console.log(err);
        alert("Error getting tutor");
      }
    };

    if (!!user) getTutor();
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (skills === "" || description === "" || rate === "") {
      alert("Please fill in all fields");
      return;
    }

    try {
      await axios.put("/api/tutors/edit", {
        user_id: user.id,
        skills,
        description,
        rate: Number(rate),
      });
      alert("Tutor profile edited successfully");
      navigate("/account");
    } catch (err) {
      console.log(err);
      alert("Error editing tutor");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete("/api/tutors/delete", {
        params: { user_id: user.id },
      });
      alert("Tutor profile deleted successfully");
      setUser({ ...user, isTutor: 0 });
      navigate("/account");
    } catch (err) {
      console.log(err);
      alert("Error deleting tutor");
    }
  };

  return (
    <div>
      <div className="max-w-[1280px] mx-auto pt-8 flex">
        <div
          className="flex items-center gap-2 px-4 py-2 hover:cursor-pointer"
          onClick={() => navigate("/account")}
        >
          <i className="fa-solid fa-angle-left"></i>
          <span>Back</span>
        </div>
        <div className="grow"></div>
      </div>
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-[1280px] w-full flex flex-col items-center">
          <h1 className="mb-4 text-3xl font-semibold text-primary">
            Edit tutor profile
          </h1>
          <form
            className="flex flex-col gap-2"
            onSubmit={handleUpdate}
          >
            <input
              placeholder="Your skills?"
              name="skills"
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="px-4 py-2 border border-black rounded-sm"
            />
            <input
              placeholder="Describe yourself"
              name="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-4 py-2 border border-black rounded-sm"
            />
            <input
              placeholder="Rate per hour"
              name="rate"
              type="number"
              value={rate}
              min={0}
              onChange={(e) => setRate(e.target.value)}
              className="px-4 py-2 border border-black rounded-sm"
            />
            <button className="py-1 text-white rounded-lg bg-primary hover:bg-primary_dark hover:text-gray-200">
              Update
            </button>
          </form>
          <button
            className="px-[5.1rem] py-1 mt-4 rounded-lg text-primary bg-white hover:bg-primary hover:text-white font-bold border border-primary"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTutor;
