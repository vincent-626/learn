import React from "react";

function TutorComponent(props) {
  const { tutor } = props;

  return (
    <div className="px-6 py-4 border rounded-md">
      <div className="flex h-full gap-4">
        <div className="flex items-center justify-center w-12 h-12 overflow-hidden border rounded-full shrink-0">
          {!!tutor && !!tutor.photo && (
            <img
              src={`http://localhost:3000/uploads/${tutor?.photo}`}
              alt=""
            />
          )}
        </div>
        <div className="flex flex-col justify-between h-full grow">
          <div>
            <p className="text-xl font-semibold">{tutor.name}</p>
            <p className="text-sm">{tutor.university}</p>
            <p className="text-sm text-gray-600">{tutor.description}</p>
          </div>
          <div>
            <p className="mt-2 text-sm">Skills: {tutor.skills}</p>
            <div className="flex items-center justify-between mt-2">
              <p>
                <span className="text-xl font-semibold">${tutor.rate}</span>
                /hr
              </p>
              <a
                href={`mailto:${tutor.email}`}
                className="px-3 py-1 ml-2 text-white rounded-full bg-primary hover:bg-primary_dark"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorComponent;
