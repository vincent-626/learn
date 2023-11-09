import React from "react";
import LearnerComponent from "./LearnerComponent";
import TutorComponent from "./TutorComponent";

function PeopleList(props) {
  const { list, fixedTarget } = props;

  return (
    <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
      {list.length > 0 &&
        list.map((people) => {
          if (fixedTarget === "learner") {
            return (
              <LearnerComponent
                key={people.id}
                learner={people}
              />
            );
          } else {
            return (
              <TutorComponent
                key={people.id}
                tutor={people}
              />
            );
          }
        })}
    </div>
  );
}

export default PeopleList;
