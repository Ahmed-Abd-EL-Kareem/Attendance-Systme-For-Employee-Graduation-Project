import React from "react";
// import { Menu } from "lucide-react";
// import Sidebar from "./Sidebar";

const Header = () => {
  return (
    <header className="header w-100 position-absolute">
      <div className="content d-flex justify-content-end py-2 px-4">
        {/* <Sidebar /> */}
        <div className=" d-flex flex-row justify-content-end align-items-center py-1 bg-transparent text-light">
          <div className="card">
            <p>Admin</p>
          </div>
          <img src="/img/team-1.png" alt="" />
        </div>
      </div>
    </header>
  );
};

export default Header;
