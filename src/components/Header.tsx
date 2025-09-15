import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="header absolute top-[35%] left-6 md:left-32 -translate-y-1/2 w-4/5 md:w-3/5">
      <h1 className="text-4xl md:text-6xl font-medium -tracking-[0.05em] md:-tracking-[0.1rem] leading-tight">
        Full Stack Developer & Software Engineer
      </h1>
    </div>
  );
};

export default Header;