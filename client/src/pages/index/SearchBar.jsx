import { useState } from "react";

function SearchBar(props) {
  const { search, setSearch, target, setTarget, setClickSearch } = props;

  return (
    <div className="my-8 w-full border rounded-full flex justify-center items-center max-w-[1080px] gap-2">
      <button
        onClick={() => {
          setClickSearch(true);
        }}
        className="ml-4 pr-2 border-r-[1px] fa-solid fa-magnifying-glass hover:text-gray-700"
      ></button>
      <input
        id="search-bar"
        placeholder="What do you want to learn?"
        className="mr-2 grow"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            setClickSearch(true);
          }
        }}
      />
      <div className="relative flex px-2 rounded-full">
        <button
          className={`bg-primary rounded-full flex justify-center items-center absolute text-white transition-all duration-200 hover:bg-primary_dark ${
            target === "tutor" && "right-20 w-16 h-10"
          } ${target === "learner" && "right-0 w-20 h-10"}`}
          onClick={() => setClickSearch(true)}
        >
          <p>
            {target === "tutor" && "Tutor"}
            {target === "learner" && "Learner"}
          </p>
        </button>
        <button
          className="py-2 pl-[0.85rem] pr-3 border-l-2 rounded-full"
          onClick={() => {
            setClickSearch(true);
            setTarget("tutor");
          }}
        >
          Tutor
        </button>
        <button
          className="py-2 pl-2 pr-2"
          onClick={() => {
            setClickSearch(true);
            setTarget("learner");
          }}
        >
          Learner
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
