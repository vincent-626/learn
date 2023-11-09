import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import axios from "axios";
import PeopleList from "./PeopleList";

function IndexPage() {
  const [search, setSearch] = useState("");
  const [target, setTarget] = useState("learner");
  const [fixedTarget, setFixedTarget] = useState("learner");
  const [list, setList] = useState([]);
  const [clickSearch, setClickSearch] = useState(true);

  useEffect(() => {
    if (clickSearch) {
      if (target == "learner") {
        axios.get("/api/learners", { params: { search } }).then((res) => {
          setList(res.data);
          setFixedTarget(target);
        });
      }

      if (target == "tutor") {
        axios.get("/api/tutors", { params: { search } }).then((res) => {
          setList(res.data);
          setFixedTarget(target);
        });
      }

      setClickSearch(false);
    }
  }, [clickSearch]);

  return (
    <div className="flex justify-center w-full">
      <div className="max-w-[1280px] w-full flex justify-center">
        <div className="flex flex-col items-center w-full px-4">
          <SearchBar
            search={search}
            setSearch={setSearch}
            target={target}
            setTarget={setTarget}
            setClickSearch={setClickSearch}
          />
          <PeopleList
            list={list}
            fixedTarget={fixedTarget}
          />
        </div>
      </div>
    </div>
  );
}

export default IndexPage;
