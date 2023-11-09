import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

function NewPosting() {
  const { user } = useContext(UserContext);

  if (!user?.isTutor || !user?.isLearner) {
    return (
      <div className="w-full max-w-[1080px] py-8 flex justify-center text-primary font-semibold">
        {!user?.isTutor && (
          <Link
            to="/account/tutor/new"
            className="px-4 py-1 transition-all duration-300 border border-primary hover:text-white hover:bg-primary"
          >
            Be a tutor
          </Link>
        )}
        {!user?.isLearner && (
          <Link
            to="/account/learner/new"
            className="px-4 py-1 transition-all duration-300 border border-primary hover:text-white hover:bg-primary"
          >
            Be a learner
          </Link>
        )}
      </div>
    );
  } else return "";
}

export default NewPosting;
