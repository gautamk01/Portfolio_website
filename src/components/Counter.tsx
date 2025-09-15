import React from "react";

const Counter: React.FC = () => {
  return (
    <div className="counter fixed right-12 bottom-8 z-10 flex h-[120px] text-[120px] leading-[150px] [clip-path:polygon(0_0,100%_0,100%_120px,0_120px)]">
      <div className="counter-1 digit"></div>
      <div className="counter-2 digit"></div>
      <div className="counter-3 digit"></div>
    </div>
  );
};

export default Counter;
