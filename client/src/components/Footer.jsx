import React from "react";

function Footer() {
  return (
    <div className="flex flex-col items-center gap-4 pt-10 pb-6 text-white bg-primary mt-28">
      <a
        className="hover:cursor-pointer"
        href="mailto:vincent.ming.han.tee@gmail.com"
      >
        <i class="fa-solid fa-envelope"></i>{" "}
        <span className="hover:underline">Contact Us</span>
      </a>
      <p className="text-xs">&#169; 2023 Learn.</p>
    </div>
  );
}

export default Footer;
