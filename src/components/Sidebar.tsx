import React from "react";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar absolute top-0 left-0 w-20 h-screen pt-6 flex justify-center items-start">
      <div className="logo relative w-8 aspect-square scale-0"></div>
      <div className="divider absolute right-0 top-0 w-px h-full bg-stroke origin-top"></div>
    </div>
  );
};

export default Sidebar;
