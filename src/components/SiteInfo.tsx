import React from 'react';

const SiteInfo: React.FC = () => {
  return (
    <div className="site-info absolute right-6 top-[60%] -translate-y-1/2 w-4/5 md:w-1/5 flex flex-col gap-4 left-6 md:left-auto">
      <h2 className="text-2xl md:text-3xl font-medium -tracking-[0.02rem] leading-tight">
        Computer Science graduate specializing in web development, algorithms, and system design
      </h2>
      <div className="divider w-full h-px bg-stroke origin-left scale-x-0"></div>
      <div className="site-info-copy flex flex-col gap-1">
        <p>Passionate problem solver</p>
        <p>Available for opportunities</p>
      </div>
    </div>
  );
};

export default SiteInfo;