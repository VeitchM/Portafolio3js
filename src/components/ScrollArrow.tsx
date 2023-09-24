import React from "react";

// From panasonic page, an idea, it needs a wrapper

const ScrollArrow = () => {
  return (
    <div className="relative h-96 w-12">
      <div className="absolute z-10 left-0 bottom-0 w-full h-0 pb-[386.96%] bg-no-repeat bg-center bg-scroll bg-[url(/icons/downArrow.svg)] animate-bounce animate-infinite animate-2s animate-cubic-bezier"></div>
    </div>
  );
};

export default ScrollArrow;
