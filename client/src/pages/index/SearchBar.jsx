import { useState } from "react";

function SearchBar() {
  const [target, setTarget] = useState("learner");
  const [search, setSearch] = useState("");

  // TODO: Implement search functionality
  function handleSearch() {}

  return (
    <div className="my-8 w-full border rounded-full flex justify-center items-center max-w-[1080px] gap-2">
      <button className="ml-4 pr-2 border-r-[1px] fa-solid fa-magnifying-glass"></button>
      <input
        id="search-bar"
        placeholder="Search"
        className="grow mr-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="rounded-full px-2 flex relative">
        <button
          className={`bg-primary rounded-full flex justify-center items-center absolute text-white transition-all duration-200 ${
            target === "tutor" && "right-20 w-16 h-10"
          } ${target === "learner" && "right-0 w-20 h-10"}`}
        >
          <p>
            {target === "tutor" && "Tutor"}
            {target === "learner" && "Learner"}
          </p>
        </button>
        <button
          className="pr-1 py-2"
          onClick={() => setTarget("tutor")}
        >
          Tutor
        </button>
        <button
          className="pl-4 pr-2 py-2"
          onClick={() => setTarget("learner")}
        >
          Learner
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
