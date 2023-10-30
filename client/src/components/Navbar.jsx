import React from "react";

function Navbar() {
  return (
    <div className="flex justify-between items-center bg-[#FF6969] px-20 py-4 w-full sticky text-white text-2xl">
      <div className="font-semibold text-3xl">Learn</div>
      <div className="flex gap-3 items-center bg-white border rounded-full px-4 py-1 text-[#FF6969]">
        <i class="fa-solid fa-bars" />
        <div className="flex items-center gap-1">
          <div className="rounded-full border bg-[#FF6969] overflow-hidden w-6 h-6 flex items-center justify-center">
            <i class="text-xl relative top-[0.18rem] text-white fa-solid fa-user"></i>
          </div>
          <p className="text-xl">Name</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
