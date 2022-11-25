import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-black dark:border-violet-400"></div>
    </div>
  );
};

export default Loader;
