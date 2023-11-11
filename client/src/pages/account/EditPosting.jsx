import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

function EditPosting() {
  const { user } = useContext(UserContext);

  if (!!user?.isTutor || !!user?.isLearner) {
    return (
      <div className="w-full max-w-[1080px] pb-2 flex justify-center text-primary font-semibold">
        {!!user?.isTutor && (
          <Link
            to="/account/tutor/edit"
            className="px-4 py-1 transition-all duration-300 border border-primary hover:text-white hover:bg-primary"
          >
            Edit tutor
          </Link>
        )}
        {!!user?.isLearner && (
          <Link
            to="/account/learner/edit"
            className="px-4 py-1 transition-all duration-300 border border-primary hover:text-white hover:bg-primary"
          >
            Edit learner
          </Link>
        )}
      </div>
    );
  } else return "";
}

export default EditPosting;
