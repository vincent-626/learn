import SearchBar from "./SearchBar";

// TODO: Display tutors/learners

function IndexPage() {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[1280px] w-full flex justify-center">
        <div className="w-full px-4 flex justify-center">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}

export default IndexPage;
