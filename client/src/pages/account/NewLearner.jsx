import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";

function NewLearner() {
  const { user, setUser } = useContext(UserContext);
  const [skills, setSkills] = useState("");
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (skills === "" || description === "" || rate === "") {
      alert("Please fill in all fields");
      return;
    }

    try {
      await axios.post("/api/learners/new", {
        user_id: user.id,
        skills,
        description,
        rate: Number(rate),
      });
      setUser({ ...user, isLearner: 1 });
      alert("Learner created successfully");
      navigate("/account");
    } catch (err) {
      console.log(err);
      alert("Error creating learner");
    }
  };

  return (
    <div className="flex justify-center w-full pt-8">
      <div className="max-w-[1280px] w-full flex flex-col items-center">
        <h1 className="mb-4 text-3xl font-semibold text-primary">
          Be a learner
        </h1>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit}
        >
          <input
            placeholder="What to learn?"
            name="skills"
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="px-4 py-2 border border-black rounded-sm"
          />
          <input
            placeholder="Description"
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
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewLearner;
